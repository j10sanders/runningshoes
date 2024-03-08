"use client";
import styled from "@emotion/styled";
import { Input, Button } from "@mui/joy";
import { useState } from "react";

const MainDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  min-height: 100vh;
  justify-content: flex-start;
  width: 80%;
`;

const SearchBarContainer = styled.div`
  padding: 20px;
  padding-bottom: 40px;
`;

const App = () => {
  const [value, setValue] = useState("");

  const inputChange = (e) => {
    setValue(e.target.value);
  };

  const handleSubmitVideo = async () => {
    // event.preventDefault();

    try {
      const response = await fetch("/api/delete-video", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ urlAddress: value }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();
      console.log(data, "DATA");
    } catch (error) {
      console.error("Failed to fetch:", error);
    }
  };

  return (
    <MainDiv>
      <SearchBarContainer>
        <Input value={value} onChange={inputChange} />
        <Button onClick={() => handleSubmitVideo()}>delete video</Button>
      </SearchBarContainer>
    </MainDiv>
  );
};

export default App;
