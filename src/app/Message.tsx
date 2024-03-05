import { Box, FlexBox } from "./Styles";

export interface MessageProps extends React.PropsWithChildren {
  image?: string;
  placement: "left" | "right";
  maxHeight?: number;
}

const Image = Box.withComponent("img");

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
        borderRadius={30}
        height={"60px"}
        width={"60px"}
        ml={placement === "right" ? 32 : 0}
        mr={placement === "left" ? 32 : 0}
        src="https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTA5L3Jhd3BpeGVsX29mZmljZV8yOF9mZW1hbGVfbWluaW1hbF9yb2JvdF9mYWNlX29uX2RhcmtfYmFja2dyb3VuZF81ZDM3YjhlNy04MjRkLTQ0NWUtYjZjYy1hZmJkMDI3ZTE1NmYucG5n.png"
      />
    )}
    <Box
      backgroundColor="beige"
      ml={placement === "right" || !image ? (92 as never) : 0}
      mr={placement === "left" || !image ? (92 as never) : 0}
      p={16}
      fontSize={20}
      color="black"
    >
      {children}
    </Box>
  </FlexBox>
);
