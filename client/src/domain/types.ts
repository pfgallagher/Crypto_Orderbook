interface Order {
	id: string;
	quantity: number;
	price: number;
}

export type Asks = Order[];
export type Bids = Order[];

export interface OrderbookMessage {
	asks: Asks;
	bids: Bids;
}

export interface OrderbookContext {
	asks: Asks;
	bids: Bids;
	spread: number;
	setAsks: (asks: Asks) => void;
	setBids: (bids: Bids) => void;
	setSpread: (spread: number) => void;
}
