import { Box, FlexBox } from "./Styles";
import Image, { StaticImageData } from "next/image";

export interface MessageProps extends React.PropsWithChildren {
  image?: StaticImageData;
  placement: "left" | "right";
  maxHeight?: number;
}

export const Message: React.FC<MessageProps> = ({
  children,
  image,
  placement,
  maxHeight,
}) => (
  <FlexBox
    flexDirection={placement === "right" ? "row-reverse" : "row"}
    justifyContent={placement === "right" ? "end" : "left"}
    pt={16}
    width="100%"
    overflow="overlay"
    maxHeight={maxHeight || "auto"}
    backgroundColor="transparent"
  >
    {image && (
      <Image
        alt="profile image"
        height={40}
        width={40}
        style={{
          borderRadius: 30,
          maxHeight: 40,
          marginRight: placement === "left" ? 32 : 0,
          marginLeft: placement === "right" ? 32 : 0,
          marginTop: 8,
        }}
        src={image}
      />
    )}
    <Box
      background={
        placement === "left"
          ? "#31343a"
          : "linear-gradient(130deg,#0842a0 30%,#07347e 95%)"
      }
      ml={placement === "right" || !image ? (92 as never) : 0}
      mr={placement === "left" || !image ? (92 as never) : 0}
      p={22}
      fontSize={20}
      color={placement === "left" ? "#e8eaed" : "#fff"}
      borderRadius={16}
    >
      {children}
    </Box>
  </FlexBox>
);
