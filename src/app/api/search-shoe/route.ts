import dbConnect from "../libs/dbConnect";
import { addVideoToAstra } from "../libs/addVideoToAstra";
import { addChatGPTresponse } from "../libs/addChatGPTresponse";
import { findVideos } from "../libs/astradb-mongoose";
// import type { NextApiResponse } from "next";

export const POST = async (req: Request) => {
  const body = await req.json();
  let messages = body.messages || [];

  console.log(body.shoe, "URLADDRESS");
  let videos = findVideos(body.shoe);
  console.log(videos, "VIDEOS");
  let updatedMessages = await addChatGPTresponse(videos, messages, body.shoe);
  return new Response(JSON.stringify({ messages: updatedMessages }));
};
