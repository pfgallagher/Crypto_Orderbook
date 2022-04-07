import type WebSocket from "ws";
import { COINBASE_CONFIG } from "../domain";

export const subscribeToBTCFeed = (ws: WebSocket): void => {
	ws.send(JSON.stringify(COINBASE_CONFIG));
};
