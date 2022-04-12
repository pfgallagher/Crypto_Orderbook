import type { FunctionComponent } from "react";
import { useOrderbookContext } from "../Context";
import { TD, Price, Quantity, TR } from "./StyledComponents";

export const Asks: FunctionComponent<Record<string, unknown>> = () => {
	const { asks } = useOrderbookContext();
	return (
		<>
			{asks.map(([price, quantity], i) => (
				<TR key={`Ask-${i}`}>
					<TD />
					<Price>{price.toFixed(2)}</Price>
					<Quantity side="sell">{quantity.toFixed(4)}</Quantity>
				</TR>
			))}
		</>
	);
};
