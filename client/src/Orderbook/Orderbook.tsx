import type { FunctionComponent } from "react";
import { Table, TBody } from "./StyledComponents";
import { Asks } from "./Asks";
import { Bids } from "./Bids";
import { Spread } from "./Spread";
import { Header } from "./Header";

export const Orderbook: FunctionComponent<Record<string, unknown>> = () => (
	<Table>
		<Header />
		<TBody>
			<Asks />
			<Spread />
			<Bids />
		</TBody>
	</Table>
);
