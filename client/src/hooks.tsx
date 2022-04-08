import { useEffect, useRef } from "react";
import { useOrderbookContext } from "./Context";
import type { OrderbookMessage } from "./domain";

export const useInitializeWebsocket = () => {
	const ws = useRef<WebSocket | null>(null);
	const { setAsks, setBids, setSpread } = useOrderbookContext();

	useEffect(() => {
		if (!ws.current) {
			ws.current = new WebSocket("ws:localhost:8000");
			ws.current.onmessage = e => {
				const { asks, bids }: OrderbookMessage = JSON.parse(e.data);
				setSpread(asks[asks.length - 1]?.price - bids[0]?.price);
				setAsks(asks);
				setBids(bids);
			};
		}
		return () => {
			if (ws.current) {
				ws.current.close();
			}
		};
	}, []);
};
