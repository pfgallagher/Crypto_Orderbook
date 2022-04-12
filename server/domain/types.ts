export enum OrderbookMessageType {
	OPEN = "open",
	DONE = "done",
	MATCH = "match",
	CHANGE = "change",
}

export interface BaseMessage {
	type: OrderbookMessageType;
	side: "buy" | "sell";
	product_id: "BTC-USD";
	sequence: number;
	time: string;
}

export interface Open extends BaseMessage {
	type: OrderbookMessageType.OPEN;
	order_id: string;
	price: string;
	remaining_size: string;
}

export interface Done extends BaseMessage {
	type: OrderbookMessageType.DONE;
	price: string;
	order_id: string;
	reason: "filled" | "canceled";
	remaining_size: string;
}

export interface Match extends BaseMessage {
	type: OrderbookMessageType.MATCH;
	trade_id: number;
	maker_order_id: string;
	taker_order_id: string;
	size: string;
	price: string;
}

export interface Change extends BaseMessage {
	type: OrderbookMessageType.CHANGE;
	order_id: string;
	new_size: string;
	old_size: string;
	price: string;
}

export type OrderbookMessage = Open | Done | Match | Change;

export interface Order {
	id: string;
	quantity: number;
	price: number;
}

export type OrderOutput = [number, number]; // [price, quantity]

export interface Snapshot {
	asks: [string, string, string][];
	bids: [string, string, string][];
	sequence: number;
}

export interface OrderbookOutput {
	asks: Order[];
	bids: Order[];
}
