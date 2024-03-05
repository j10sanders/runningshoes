import dbConnect from "../libs/dbConnect";
import { addVideoToAstra } from "../libs/addVideoToAstra";
import { addChatGPTresponse } from "../libs/addChatGPTresponse";
// import type { NextApiResponse } from "next";

export const POST = async (req: Request) => {
  const body = await req.json();
  let messages = body.messages || [];

  console.log(body.urlAddress, "URLADDRESS");
  let video = await addVideoToAstra(body.urlAddress);
  console.log("___VIDEO___", video, "___VIDEOEND___");
  let updatedMessages = await addChatGPTresponse(video, messages);
  return new Response(JSON.stringify({ video, messages: updatedMessages }));
};
