import type { FunctionComponent } from "react";
import { createGlobalStyle } from "styled-components";
import { useInitializeWebsocket } from "./hooks";
import { Orderbook } from "./Orderbook";

const GlobalStyle = createGlobalStyle`
html {
	height: 100%;
}
  body {
    background: #4c566a;
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100%;
}
`;

export const App: FunctionComponent<Record<string, unknown>> = () => {
	useInitializeWebsocket();
	return (
		<>
			<GlobalStyle />
			<Orderbook />
		</>
	);
};
