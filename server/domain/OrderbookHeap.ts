import Heap from "heap";
import type { Order, Open, Change, Match, OrderOutput } from "./types";

export interface OrderbookHeap extends Heap<Order> {
	/*
    Merge and configure the internal types from Heap so we can add methods fairly safely.
    Note: if this were a prod app, we'd probably want to refactor this to minimize coupling, as OrderbookHeap is reliant on the implementation details of Heap. 
   */
	nodes: Order[];
	cmp: (a: Order, b: Order) => number;
}

export class OrderbookHeap extends Heap<Order> {
	public fromSnapshot = (orders: [string, string, string][]): void => {
		for (const [price, quantity, id] of orders) {
			this.push({
				id: id,
				price: Number.parseFloat(price),
				quantity: Number.parseFloat(quantity),
			});
		}
	};

	public openOrder = ({
		order_id: id,
		price: _price,
		remaining_size: _remaining_size,
	}: Open): void => {
		const price = Number.parseFloat(_price);
		const quantity = Number.parseFloat(_remaining_size);
		if (this.findIdx(id) === -1) {
			this.push({
				id,
				price,
				quantity,
			});
		}
	};

	public readOrder = (targetId: string): Order | undefined =>
		this.nodes.find(({ id }) => id === targetId);

	public changeOrder = ({ order_id: id, price, new_size }: Change): void => {
		this.updateOrder({
			id,
			price: Number.parseFloat(price),
			quantity: Number.parseFloat(new_size),
		});
	};

	public matchOrder = (
		{ size }: Match,
		{ quantity, id, price }: Order,
	): void => {
		const quantityAfterMatch = quantity - Number.parseFloat(size);
		if (0 < quantityAfterMatch) {
			this.updateOrder({
				id,
				quantity: quantityAfterMatch,
				price,
			});
		} else {
			this.deleteOrder(id);
		}
	};

	public deleteOrder = (targetId: string): void => {
		const idx = this.findIdx(targetId);
		if (idx !== -1) {
			this.nodes.splice(idx, 1);
		}
	};

	public nLargest = (n: number): OrderOutput[] => {
		const safetyFactor = 10;
		const largestWithPossibleDuplicates = Heap.nlargest(
			this.nodes,
			n * safetyFactor,
			this.cmp,
		);
		const largest: { [price: number]: number } = {};
		for (const { price, quantity } of largestWithPossibleDuplicates) {
			if (largest.hasOwnProperty(price)) {
				largest[price] += quantity;
			} else {
				largest[price] = quantity;
			}
			if (Object.keys(largest).length === n + 1) {
				break;
			}
		}
		return Object.entries(largest)
			.map<[number, number]>(([p, q]) => [Number.parseFloat(p), q])
			.slice(0, n);
	};

	public nSmallest = (n: number): Order[] =>
		Heap.nsmallest(this.nodes, n, this.cmp);

	private updateOrder = (order: Order): void => {
		const idx = this.findIdx(order.id);
		if (idx !== -1) {
			this.nodes.splice(idx, 1, order);
			this.heapify();
		}
	};

	private findIdx = (targetId: string): number =>
		this.nodes.findIndex(({ id }) => id === targetId);
}
