"use client";
import styled from "@emotion/styled";
import { Input, Button } from "@mui/joy";
import { useState } from "react";
// import { addVideoToAstra } from "./libs/addVideoToAstra.js";

const MainDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  min-height: 100vh;
  justify-content: flex-start;
`;

const SearchBarContainer = styled.div`
  padding: 20px;
  padding-bottom: 40px;
`;

const ContentContainer = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const App = () => {
  const [value, setValue] = useState("");

  const handleSubmit = async () => {
    // event.preventDefault();

    try {
      const response = await fetch("/api/post-video", {
        // Targeting the /api/ endpoint
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ urlAddress: value }), // Sending the video URL in the request body
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();
      // setVideoInfo(data);  // Handling the response
    } catch (error) {
      console.error("Failed to fetch:", error);
    }
  };

  return (
    <MainDiv>
      <SearchBarContainer>
        <Input value={value} onChange={(e) => setValue(e.target.value)} />
        <Button onClick={() => handleSubmit()}>Search</Button>
      </SearchBarContainer>
      <ContentContainer>Output to be displayed here</ContentContainer>
    </MainDiv>
  );
};
