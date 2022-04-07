import axios from "axios";
import type { Snapshot } from "../domain";

export const getSnapshot = async (): Promise<Snapshot> => {
	const { data } = await axios.get<Snapshot>(
		"https://api.exchange.coinbase.com/products/BTC-USD/book?level=3",
	);
	return data;
};
