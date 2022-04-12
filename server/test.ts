import test from "ava";
import { OrderbookMessageType, Open, OrderbookHeap } from "./domain";

const mockOrders: Open[] = [
	{
		order_id: "id1",
		price: "1",
		product_id: "BTC-USD",
		remaining_size: "1",
		sequence: 1,
		side: "buy",
		time: "1",
		type: OrderbookMessageType.OPEN,
	},
	{
		order_id: "id2",
		price: "2",
		product_id: "BTC-USD",
		remaining_size: "2",
		sequence: 2,
		side: "buy",
		time: "2",
		type: OrderbookMessageType.OPEN,
	},
	{
		order_id: "id3",
		price: "3",
		product_id: "BTC-USD",
		remaining_size: "3",
		sequence: 3,
		side: "buy",
		time: "3",
		type: OrderbookMessageType.OPEN,
	},
];

test("OrderbookHeap.openOrder", t => {
	const ob = new OrderbookHeap();
	for (const order of mockOrders) {
		ob.openOrder(order);
	}
	t.deepEqual(ob.nodes, [
		{
			id: "id1",
			price: 1,
			quantity: 1,
		},
		{
			id: "id2",
			price: 2,
			quantity: 2,
		},
		{
			id: "id3",
			price: 3,
			quantity: 3,
		},
	]);
});

test("OrderbookHeap.changeOrder", t => {
	const ob = new OrderbookHeap();
	ob.openOrder(mockOrders[2]);
	ob.changeOrder({
		order_id: "id3",
		new_size: "4",
		old_size: "3",
		price: "3",
		product_id: "BTC-USD",
		sequence: 4,
		side: "buy",
		time: "4",
		type: OrderbookMessageType.CHANGE,
	});
	t.deepEqual(ob.nodes, [
		{
			id: "id3",
			price: 3,
			quantity: 4,
		},
	]);
});

test("OrderbookHeap.deleteOrder", t => {
	const ob = new OrderbookHeap();
	ob.openOrder(mockOrders[2]);
	ob.deleteOrder(mockOrders[2].order_id);
	t.deepEqual(ob.nodes, []);
});

test("OrderbookHeap.readOrder", t => {
	const ob = new OrderbookHeap();
	ob.openOrder(mockOrders[2]);
	t.deepEqual(ob.readOrder(mockOrders[2].order_id), {
		id: "id3",
		price: 3,
		quantity: 3,
	});
});

test("OrderbookHeap.matchOrder", t => {
	const ob = new OrderbookHeap();
	ob.openOrder(mockOrders[2]);
	ob.matchOrder(
		{
			maker_order_id: "id3",
			price: "3",
			product_id: "BTC-USD",
			sequence: 5,
			side: "buy",
			size: "3",
			taker_order_id: "id4",
			time: "5",
			trade_id: 1,
			type: OrderbookMessageType.MATCH,
		},
		{ quantity: 3, id: "id3", price: 3 },
	);
	t.deepEqual(ob.nodes, []);
});

test("OrderbookHeap.nLargest", t => {
	const ob = new OrderbookHeap();
	for (const order of mockOrders) {
		ob.openOrder(order);
	}
	t.deepEqual(ob.nLargest(2), [
		[1, 1],
		[2, 2],
	]);
});

test("OrderbookHeap.fromSnapshot", t => {
	const ob = new OrderbookHeap();
	ob.fromSnapshot(
		mockOrders.map(({ price, remaining_size, order_id }) => [
			price.toString(),
			remaining_size,
			order_id,
		]),
	);
	t.deepEqual(ob.nodes, [
		{
			id: "id1",
			price: 1,
			quantity: 1,
		},
		{
			id: "id2",
			price: 2,
			quantity: 2,
		},
		{
			id: "id3",
			price: 3,
			quantity: 3,
		},
	]);
});
