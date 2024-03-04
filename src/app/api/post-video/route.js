import dbConnect from "../libs/dbConnect";
import { addVideoToAstra } from "../libs/addVideoToAstra";
import { addChatGPTresponse } from "../libs/addChatGPTresponse";

export async function POST(req, res) {
  await dbConnect();

  const { urlAddress, messages = [] } = req.body;
  console.log(`urlAddress: ${urlAddress}`);
  let video = await addVideoToAstra(urlAddress);
  console.log("___VIDEO___", video, "___VIDEOEND___");
  let updatedMessages = await addChatGPTresponse(video, messages);

  res.send({
    video,
    messages: updatedMessages,
  });
}
