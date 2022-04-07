import { OrderbookMessage, OrderbookHeap } from "../domain";
import { getSnapshot } from "../networking";
import type { RawData } from "ws";

export class Orderbook {
	private messageQueue: OrderbookMessage[] = [];
	private askHeap = new OrderbookHeap((a, b) => b.price - a.price);
	private bidHeap = new OrderbookHeap((a, b) => a.price - b.price);

	private isSnapshotApplied = false;
	private snapshotSequence = Infinity;

	public applySnapshot = async (): Promise<void> => {
		try {
			const { asks, bids, sequence } = await getSnapshot();
			this.askHeap.fromSnapshot(asks);
			this.bidHeap.fromSnapshot(bids);
			this.snapshotSequence = sequence;
			this.isSnapshotApplied = true;
		} catch (err) {
			console.error("Failed to apply snapshot.");
		}
	};

	public enqueueMessage = (data: RawData): void => {
		this.messageQueue.push(JSON.parse(data.toString()));
	};

	public processMessageQueue = (): void => {
		if (this.isSnapshotApplied) {
			while (this.messageQueue.length) {
				const queuedMessage = this.messageQueue.shift()!;
				this.processMessage(queuedMessage);
			}
			this.crossPrevention();
		}
	};

	public publish = (): string =>
		JSON.stringify({
			asks: this.askHeap.nLargest(5),
			bids: this.bidHeap.nLargest(5),
		});

	private crossPrevention = (): void => {
		const bestBid = this.bidHeap.nLargest(1)[0];
		const bestAsk = this.askHeap.nLargest(1)[0];
		if (bestAsk.price <= bestBid.price) {
			this.bidHeap.deleteOrder(bestBid.id);
		}
	};

	private processMessage = (message: OrderbookMessage): void => {
		if (this.snapshotSequence < message.sequence) {
			const correspondingHeap =
				message.side === "buy" ? this.bidHeap : this.askHeap;
			switch (message.type) {
				case "open": {
					correspondingHeap.openOrder(message);
					return;
				}
				case "change": {
					correspondingHeap.changeOrder(message);
					return;
				}
				case "match": {
					const makerOrder = correspondingHeap.readOrder(
						message.maker_order_id,
					);
					if (makerOrder) {
						correspondingHeap.matchOrder(message, makerOrder);
					}
					return;
				}
				case "done": {
					correspondingHeap.deleteOrder(message.order_id);
					return;
				}
			}
		}
	};
}
