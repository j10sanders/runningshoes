import dbConnect from "../libs/dbConnect";
import { addVideoToAstra } from "../libs/addVideoToAstra";
import { addChatGPTresponse } from "../libs/addChatGPTresponse";
// import type { NextApiResponse } from "next";

export const POST = async (req: Request) => {
  const body = await req.json();
  let messages = body.messages || [];

  await addVideoToAstra(body.urlAddress);
  // TODO: add error and success handling
  return new Response(JSON.stringify({ status: "success" }));
};
