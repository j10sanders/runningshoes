import styled from "@emotion/styled";

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
  color?: string;
  fontSize?: number;
  borderRadius?: number;
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
`;

export const Box = styled.div<SharedProps>`
  display: ${(props) => props.display || "block"};
  ${sharedStyles}
  a:link {
    color: #0000ff;
    text-decoration: underline;
  }
`;

export const FlexBox = styled(Box)`
  display: flex;
`;
