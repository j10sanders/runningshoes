import { addChatGPTresponse } from "../libs/addChatGPTresponse";
import { findVideos } from "../libs/findRelatedVideos";

// TODO: this api route should use an AgentExecuter https://js.langchain.com/docs/use_cases/question_answering/conversational_retrieval_agents
export const POST = async (req: Request) => {
  const body = await req.json();
  let messages = body.messages || [];

  let videos = await findVideos(body.messages.slice(-1)[0].content);
  console.log(videos, "VIDEOS");
  let updatedMessages = await addChatGPTresponse(videos, messages);
  return new Response(JSON.stringify({ messages: updatedMessages }));
};
