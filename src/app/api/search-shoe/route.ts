import { agentChat } from "../libs/agent";

export const POST = async (req: Request) => {
  const body = await req.json();
  let messages = body.messages || [];

  const updatedMessages = await agentChat(
    messages.slice(0, -1),
    messages.slice(-1)[0].content
  );
  return new Response(JSON.stringify({ messages: updatedMessages }));
};
