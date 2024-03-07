import { Box, FlexBox } from "./Styles";
import Markdown from "react-markdown";
import Image from "next/image";

export interface MessageProps extends React.PropsWithChildren {
  image?: string;
  placement: "left" | "right";
  maxHeight?: number;
}

// const Image = Box.withComponent("img");

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
        height={60}
        width={60}
        style={{
          borderRadius: 30,
          maxHeight: 60,
          marginRight: placement === "left" ? 32 : 0,
          marginLeft: placement === "right" ? 32 : 0,
          marginTop: 8,
        }}
        src={image}
      />
    )}
    <Box
      backgroundColor="beige"
      ml={placement === "right" || !image ? (92 as never) : 0}
      mr={placement === "left" || !image ? (92 as never) : 0}
      p={32}
      fontSize={20}
      color="black"
      borderRadius={16}
    >
      {children}
    </Box>
  </FlexBox>
);
