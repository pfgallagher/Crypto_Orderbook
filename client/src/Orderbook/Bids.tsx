import type { FunctionComponent } from "react";
import { TD, TR, Price, Quantity } from "./StyledComponents";
import { useOrderbookContext } from "../Context";

export const Bids: FunctionComponent<Record<string, unknown>> = () => {
	const { bids } = useOrderbookContext();
	return (
		<>
			{bids.map(({ price, quantity }, i) => (
				<TR key={`Bid-${i}`}>
					<Quantity side="buy">{quantity.toFixed(4)}</Quantity>
					<Price>{price.toFixed(2)}</Price>
					<TD />
				</TR>
			))}
		</>
	);
};
