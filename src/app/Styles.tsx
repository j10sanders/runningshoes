import styled from "@emotion/styled";

type FlexBox = {
  flexDirection?: string;
  justifyContent?: string;
  pt?: number;
  width?: string;
  overflow?: string;
  maxHeight?: string | number;
  height?: string;
  alignItems?: string;
  backgroundColor?: string;
};

type Box = {
  ml?: number;
  mr?: number;
  p?: number;
  fontSize?: number;
  display?: string;
  borderRadius?: number;
  pt?: number;
  px?: number;
  pb?: number;
  backgroundColor?: string;
  color?: string;
  height?: string;
};

export const FlexBox = styled.div<FlexBox>`
  display: flex;
  flex-direction: ${(props) => props.flexDirection};
  justify-content: ${(props) => props.justifyContent};
  padding-top: ${(props) => props.pt}px;
  width: ${(props) => props.width};
  overflow: ${(props) => props.overflow};
  max-height: ${(props) => props.maxHeight};
  height: ${(props) => props.height};
  align-items: ${(props) => props.alignItems};
  background: ${(props) => props.backgroundColor};
`;

export const Box = styled.div<Box>`
  background: #f0f0f0;
  border-radius: 16px;
  padding: ${(props) => props.p}px;
  font-size: ${(props) => props.fontSize}px;
  margin-left: ${(props) => props.ml}px;
  margin-right: ${(props) => props.mr}px;
  display: ${(props) => props.display};
  border-radius: ${(props) => props.borderRadius}px;
  padding-top: ${(props) => props.pt}px;
  padding-x: ${(props) => props.px}px;
  padding-bottom: ${(props) => props.pb}px;
  background-color: ${(props) => props.backgroundColor};
  color: ${(props) => props.color};
  height: ${(props) => props.height};
`;
