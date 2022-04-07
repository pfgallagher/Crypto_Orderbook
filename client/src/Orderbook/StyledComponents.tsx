import styled from "styled-components";

export const Table = styled.table`
	background-color: #2e3440;
	border-collapse: collapse;
`;

export const TH = styled.th`
	border: 1px solid black;
	color: #88c0d0;
	padding: 0.25em;
`;

export const TR = styled.tr``;

export const TD = styled.td`
	color: #2e3440;
	border: 1px solid black;
	padding: 0.25em;
`;

export const THead = styled.thead``;

export const TBody = styled.tbody``;

export const Price = styled(TD)`
	color: #d8dee9;
`;

export const SpreadValue = styled(Price)`
	text-align: right;
`;

export const Quantity = styled(TD)<{ side: "buy" | "sell" }>`
	background-color: ${props => (props.side === "buy" ? "#a3be8c" : "#bf616a")};
`;
