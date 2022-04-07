import {
	FunctionComponent,
	useState,
	createContext,
	useMemo,
	useContext,
} from "react";
import type {
	OrderbookContext as _OrderbookContext,
	Asks,
	Bids,
} from "./domain";

const OrderbookContext = createContext<_OrderbookContext>({
	asks: [],
	bids: [],
	spread: 0,
	setAsks: () => {},
	setBids: () => {},
	setSpread: () => {},
});

export const Context: FunctionComponent<Record<string, unknown>> = ({
	children,
}) => {
	const [asks, setAsks] = useState<Asks>([]);
	const [bids, setBids] = useState<Bids>([]);
	const [spread, setSpread] = useState(0);
	const value: _OrderbookContext = useMemo(
		() => ({ asks, bids, spread, setAsks, setBids, setSpread }),
		[asks, bids, spread, setAsks, setBids, setSpread],
	);
	return (
		<OrderbookContext.Provider value={value}>
			{children}
		</OrderbookContext.Provider>
	);
};

export const useOrderbookContext = (): _OrderbookContext =>
	useContext(OrderbookContext);
