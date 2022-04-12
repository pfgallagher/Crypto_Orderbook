import type WebSocket from "ws";
import { COINBASE_CONFIG } from "../domain";

export const subscribeToBTCFeed = (ws: WebSocket): Promise<void> =>
	new Promise(res => {
		ws.send(JSON.stringify(COINBASE_CONFIG));
		res();
	});
