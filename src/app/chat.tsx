import styled from "@emotion/styled";
import { ChangeEvent, Dispatch, SetStateAction, useRef, useState } from "react";
import NextImage from "./next.svg";
import Robot from "./robot.png";
import { Message } from "./Message";
import { FlexBox, Box } from "./Styles";
import Markdown from "react-markdown";
import rehypeExternalLinks from "rehype-external-links";
import AI from "./aishoe.webp";
import Runner from "./personRunning.jpeg";

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
interface MessagesProps {
  messages: MessageType[];
  loading?: boolean;
}

const loader = (
  <Message placement="left">
    <Box display="block" borderRadius={4} pt={8} px={12} pb={"20px" as never}>
      {/* <AnimatedLoadingDots /> */}
    </Box>
  </Message>
);

export const Chat: React.FC<MessagesProps> = ({ messages, loading }) => {
  // const EnterPress = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
  //   if (event.key === "Enter" && !event.shiftKey) {
  //     event.preventDefault();
  //     if (currentAnswer) {
  //       handleUserAnswer(event as unknown as ChangeEvent<HTMLFormElement>);
  //     }
  //   }
  // };
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
                <Message image={Runner} placement="right" maxHeight={400}>
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
                  pb={"20px" as never}
                >
                  {/* <AnimatedLoadingDots /> */}
                </Box>
              </Message>
            </Box>
          )}
        </>
      </FlexBox>
      <FlexBox width="100%" justifyContent="center"></FlexBox>
    </FlexBox>
  );
};
