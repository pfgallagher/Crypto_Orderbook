import { TR, TH, THead } from "./StyledComponents";
import type { FunctionComponent } from "react";
import { useOrderbookContext } from "../Context";

export const Header: FunctionComponent<Record<string, unknown>> = () => {
	const { asks, bids } = useOrderbookContext();
	return (
		<THead>
			{asks.length || bids.length ? (
				<TR>
					<TH>BID</TH>
					<TH>PRICE</TH>
					<TH>ASK</TH>
				</TR>
			) : null}
		</THead>
	);
};
