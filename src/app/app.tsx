"use client";
import styled from "@emotion/styled";
import { Input, Button } from "@mui/joy";
import { useState } from "react";
import { Chat } from "./chat";
import { set } from "mongoose";
// import { addVideoToAstra } from "./libs/addVideoToAstra.js";

const MainDiv = styled.div`
  /* display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  min-height: 100vh;
  justify-content: flex-start; */
  width: 40%;
`;

const SearchBarContainer = styled.div`
  padding: 20px;
  padding-bottom: 40px;
`;

const ContentContainer = styled.div`
  /* width: 80%;
  display: flex;
  flex-direction: column;
  align-items: center; */
`;

const tempmessages = [
  {
    role: "system",
    content:
      "You are a helpful youtube transcript assistant. You help people find provide information in youtube video based on the captions.",
  },
  {
    role: "user",
    content:
      "The following youtube video transcript:\n\nThe video is a first impressions review of the Inov-8 Bare XF shoe by Jake at Fitr. \n\nKey points about the shoe and the reviewer's opinions include:\n\n1. **Wider Fit**: The Bare XF has a wider toe box compared to the 210 V3, making it more suitable for those who prefer a boxier toe box with more width towards the end of the toes. Jake mentions that the wide fit should accommodate wider foot types comfortably.\n  \n2. **Outsole Construction**: The shoe features a 2.5mm thick sticky rubber outsole that is rounded around the edges, providing good articulation and stability for various training activities like cross-training. Jake notes that the outsole feels similar to other models with a rounded sole, offering a unique feel during workouts.\n\n3. **Boomerang Footbed**: The Bare XF comes with a 6mm thick boomerang footbed, providing a bit more cushion and shock absorption compared to the minimalist 210 V3. Jake appreciates that this footbed gives the shoe more versatility for different training needs and eases the adjustment to barefoot shoes for new users.\n\nOverall, Jake expresses positive impressions of the shoe, highlighting its wider fit, unique outsole construction, and the inclusion of the boomerang footbed for added comfort and versatility. He suggests that the Bare XF could cater to a wider range of foot anatomies and training preferences compared to the 210 V3. A detailed full review will be released soon for more in-depth insights.\n\nAnswer the following question or questions based on the transcript.",
  },
  {
    role: "user",
    content:
      "Summarise what this video is about, and point on three key learnings.",
  },
  {
    role: "assistant",
    content:
      "This video is a first impressions review of the Inov-8 Bare XF shoe by Jake at Fitr. \n\nKey Learnings:\n1. **Wider Fit**: The Bare XF has a wider toe box accommodating wider foot types comfortably.\n  \n2. **Outsole Construction**: Features a 2.5mm thick sticky rubber outsole, offering good articulation and stability for cross-training.\n\n3. **Boomerang Footbed**: Comes with a 6mm thick boomerang footbed for added cushioning and shock absorption, making it versatile for different training needs.",
  },
];
export const App = () => {
  const [value, setValue] = useState("");
  const [messages, setMessages] = useState(tempmessages);
  console.log(value, "VALUE");

  const inputChange = (e) => {
    console.log(e, "E", e.target.value, "E.TARGET.VALUE");
    setValue(e.target.value);
  };

  const handleSubmit = async () => {
    // event.preventDefault();
    console.log(value, "value");

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
      setMessages(data.messages);
      console.log(data, "DATA");
      // setVideoInfo(data);  // Handling the response
    } catch (error) {
      console.error("Failed to fetch:", error);
    }
  };

  return (
    <MainDiv>
      <SearchBarContainer>
        <Input value={value} onChange={inputChange} />
        hello
        <Button onClick={() => handleSubmit()}>Search</Button>
      </SearchBarContainer>
      <ContentContainer>Output to be displayed here</ContentContainer>
      <Chat messages={messages} />
    </MainDiv>
  );
};
