import type { FunctionComponent } from "react";
import { TD, TR, SpreadValue } from "./StyledComponents";
import { useOrderbookContext } from "../Context";

export const Spread: FunctionComponent<Record<string, unknown>> = () => {
	const { asks, bids, spread } = useOrderbookContext();
	return (
		<>
			{asks.length || bids.length ? (
				<TR>
					<TD />
					<SpreadValue>{spread.toFixed(2)}</SpreadValue>
					<TD />
				</TR>
			) : null}
		</>
	);
};
