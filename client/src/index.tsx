import { StrictMode } from "react";
import { render } from "react-dom";
import { App } from "./App";
import { Context } from "./Context";

render(
	<StrictMode>
		<Context>
			<App />
		</Context>
	</StrictMode>,
	document.getElementById("root"),
);
