import styled from "@emotion/styled";

// Color Pallet:
// #E0ECE4
// #F7F2E7
// #D8D3CD
// #797A7E
// #3A3B3B

type SharedProps = {
  display?: string;
  flexDirection?: string;
  justifyContent?: string;
  alignItems?: string;
  pt?: number;
  pb?: number;
  pl?: number;
  pr?: number;
  ml?: number;
  mr?: number;
  p?: number;
  width?: string;
  height?: string;
  maxHeight?: string | number;
  overflow?: string;
  backgroundColor?: string;
  background?: string;
  color?: string;
  fontSize?: number;
  borderRadius?: number;
  columnGap?: number;
};

const cssProp = (prop: string | number | undefined, suffix = "") =>
  prop !== undefined ? `${prop}${suffix}` : "";

const sharedStyles = (props: SharedProps) => `
  padding-top: ${cssProp(props.pt, "px")};
  padding-bottom: ${cssProp(props.pb, "px")};
  padding-left: ${cssProp(props.pl, "px")};
  padding-right: ${cssProp(props.pr, "px")};
  margin-left: ${cssProp(props.ml, "px")};
  margin-right: ${cssProp(props.mr, "px")};
  padding: ${cssProp(props.p, "px")};
  width: ${props.width || "auto"};
  height: ${props.height || "auto"};
  max-height: ${cssProp(props.maxHeight)};
  overflow: ${props.overflow || "visible"};
  background-color: ${props.backgroundColor || "transparent"};
  color: ${props.color || "inherit"};
  font-size: ${cssProp(props.fontSize, "px")};
  border-radius: ${cssProp(props.borderRadius, "px")};
  flex-direction: ${props.flexDirection || "row"};
  justify-content: ${props.justifyContent || "flex-start"};
  align-items: ${props.alignItems || "stretch"};
  column-gap: ${cssProp(props.columnGap, "px")};
  background: ${props.background || "none"};
`;

export const Box = styled.div<SharedProps>`
  display: ${(props) => props.display || "block"};
  ${sharedStyles}
  a {
    color: #b1b1ff;
    text-decoration: underline;
  }
`;

export const FlexBox = styled(Box)`
  display: flex;
`;
