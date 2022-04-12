import WebSocket, { WebSocketServer } from "ws";
import { subscribeToBTCFeed } from "./networking";
import {
	COINBASE_URL,
	WSS_PORT,
	PUBLISH_INTERVAL_TIME_MS,
	Orderbook,
} from "./domain";

const OB = new Orderbook();

const ws = new WebSocket(COINBASE_URL)
	.on("open", async () => {
		await subscribeToBTCFeed(ws);
		await OB.applySnapshot();
	})
	.on("message", data => {
		OB.enqueueMessage(data);
		OB.processMessageQueue();
	})
	.on("error", err => {
		console.error(err);
	});

const wss = new WebSocketServer({
	port: WSS_PORT,
})
	.on("connection", ws => {
		const interval = setInterval(() => {
			ws.send(OB.publish());
		}, PUBLISH_INTERVAL_TIME_MS);
		ws.on("close", () => {
			clearInterval(interval);
		});
	})
	.on("error", err => {
		console.error(err);
	});

console.info(`WebSocket server listening on port ${wss.options.port}`);
