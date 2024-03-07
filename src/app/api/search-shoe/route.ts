import dbConnect from "../libs/dbConnect";
import { addVideoToAstra } from "../libs/addVideoToAstra";
import { addChatGPTresponse } from "../libs/addChatGPTresponse";
import { findVideos } from "../libs/findRelatedVideos";
// import type { NextApiResponse } from "next";

export const POST = async (req: Request) => {
  const body = await req.json();
  let messages = body.messages || [];

  let videos = await findVideos(body.messages.slice(-1)[0].content);
  console.log(videos, "VIDEOS");
  let updatedMessages = await addChatGPTresponse(videos, messages);
  return new Response(JSON.stringify({ messages: updatedMessages }));
};
