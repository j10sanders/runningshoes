"use client";
import styled from "@emotion/styled";
import { FormEvent, useState } from "react";
import { Chat, MessageType } from "./Components/Chat";

const MainDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  justify-content: flex-start;
  width: 80%;
`;

const ContentContainer = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const initialMessage: MessageType[] = [
  {
    role: "assistant",
    content:
      "Hey there! I watch all the running shoe reviews on YouTube so you don't have to! Kofuzi, The Run Testers, Believe in the Run, etc.... I watch them all. Which shoe are you interested in?",
  },
];
export const App = () => {
  const [messages, setMessages] = useState(initialMessage);
  const [currentMessage, setCurrentMessage] = useState(
    "Tell me what YouTube reviewers think about the:"
  );
  const [loading, setLoading] = useState(false);

  const handleSearchShoe = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();

    const newMessages = [
      ...messages,
      {
        role: "user",
        content: currentMessage,
      } as MessageType,
    ];
    setMessages(newMessages);
    setCurrentMessage("");
    setLoading(true);

    try {
      const response = await fetch("/api/search-shoe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ messages: newMessages }),
      });

      console.log("response", response);
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      setLoading(false);
      const data = await response.json();
      setMessages(data.messages);
    } catch (error) {
      console.error("Failed to fetch:", error);
    }
  };

  return (
    <MainDiv>
      <ContentContainer>
        <Chat
          messages={messages}
          handleSearchShoe={handleSearchShoe}
          setCurrentMessage={setCurrentMessage}
          currentMessage={currentMessage}
          loading={loading}
        />
      </ContentContainer>
    </MainDiv>
  );
};
