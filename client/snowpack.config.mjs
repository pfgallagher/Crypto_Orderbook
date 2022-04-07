/** @type {import("snowpack").SnowpackUserConfig } */
export default {
	mount: {
		public: { url: "/", static: true },
		src: { url: "/dist" },
	},
	plugins: [
		"@snowpack/plugin-react-refresh",
		"@snowpack/plugin-dotenv",
		"@snowpack/plugin-typescript",
	],
	buildOptions: {
		jsxInject: 'import React from "React";',
	},
	packageOptions: {
		knownEntrypoints: ["react-is"],
	},
};
