import styled from "@emotion/styled";
import { Dispatch, FormEvent, SetStateAction, useRef, useEffect } from "react";
import { Message } from "./Message";
import { FlexBox, Box } from "./Styles";
import Markdown from "react-markdown";
import rehypeExternalLinks from "rehype-external-links";
import IconButton from "@mui/joy/IconButton";
import Send from "@mui/icons-material/Send";
import { AnimatedLoadingDots } from "../AnimatedLoadingDots";
import Avatar from "../assets/avatar.png";
import AI from "../assets/ai.png";

const CustomInput = styled("input")`
  flex-grow: 2;
  border: none;
  padding: 4px 8px;
  border-radius: 8px;
  height: 56px;
  color: #fff;
  background: #3c4043;
`;

const CustomForm = styled("form")`
  display: flex;
  flex-direction: row;
  border: 1px solid;
  padding: 1px;
  width: 100%;
  max-width: 600px;
  align-items: center;
  border-radius: 8px;
`;

export type MessageType = {
  role: "user" | "assistant";
  content: string;
};

export const scaleFromLeft = {
  active: {
    scale: 1,
    opacity: 1,
    position: "relative",
    display: "inline-block",
  },
  hidden: {
    scale: 0,
    opacity: 0,
    position: "absolute",
  },
};
interface ChatProps {
  messages: MessageType[];
  loading?: boolean;
  handleSearchShoe: (e: FormEvent<HTMLFormElement>) => Promise<void>;
  setCurrentMessage: Dispatch<SetStateAction<string>>;
  currentMessage: string;
}

export const Chat: React.FC<ChatProps> = ({
  messages,
  loading,
  handleSearchShoe,
  setCurrentMessage,
  currentMessage,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollToBottom = () => {
    inputRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <FlexBox
      justifyContent="space-between"
      height="calc(100vh - 180px)"
      flexDirection="column"
      pt={16}
    >
      <FlexBox flexDirection="column">
        <>
          {messages.map(({ content, role }) => (
            <Box key={content + role} backgroundColor="transparent">
              {role === "assistant" && content && (
                <Message image={AI} placement="left">
                  <Markdown
                    rehypePlugins={[
                      [rehypeExternalLinks, { target: "_blank" }],
                    ]}
                  >
                    {content}
                  </Markdown>
                </Message>
              )}
              {role === "user" && (
                <Message image={Avatar} placement="right" maxHeight={400}>
                  {content}
                </Message>
              )}
            </Box>
          ))}
          {loading && (
            <Box>
              <Message image={AI} placement="left">
                <Box
                  display="block"
                  borderRadius={4}
                  pt={8}
                  pl={12}
                  pr={12}
                  pb={20}
                >
                  <AnimatedLoadingDots />
                </Box>
              </Message>
            </Box>
          )}
        </>
      </FlexBox>
      <FlexBox width="100%" justifyContent="center" pt={100} pb={20}>
        <FlexBox alignItems="center" flexDirection="column" width="100%">
          <CustomForm
            onSubmit={(event: FormEvent<HTMLFormElement>) =>
              handleSearchShoe(event)
            }
          >
            <CustomInput
              ref={inputRef}
              name="answer"
              value={currentMessage}
              onChange={(event) => setCurrentMessage(event.target.value)}
            />
            <IconButton
              variant="plain"
              disabled={!currentMessage || loading}
              type="submit"
              color="primary"
              sx={{ "&:hover": { backgroundColor: "inherit" } }}
            >
              <Send />
            </IconButton>
          </CustomForm>
        </FlexBox>
      </FlexBox>
    </FlexBox>
  );
};
