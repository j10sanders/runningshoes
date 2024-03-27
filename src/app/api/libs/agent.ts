import { ChatOpenAI } from "@langchain/openai";
const llm = new ChatOpenAI({ temperature: 0 });
import { tools } from "./langchainTools";
import { createOpenAIToolsAgent, AgentExecutor } from "langchain/agents";
import { pull } from "langchain/hub";
import type { ChatPromptTemplate } from "@langchain/core/prompts";
import { BaseMessage } from "langchain/schema";

// const prompt = await pull<ChatPromptTemplate>("hwchase17/openai-tools-agent");
const prompt = await pull<ChatPromptTemplate>("jonaerwawer/running");

// AgentExecuter https://js.langchain.com/docs/use_cases/question_answering/conversational_retrieval_agents
export const agentChat = async (chat_history: BaseMessage[], input: string) => {
  const agent = await createOpenAIToolsAgent({
    llm,
    tools,
    prompt,
  });

  const agentExecutor = new AgentExecutor({
    agent,
    tools,
  });

  const result = await agentExecutor.invoke({
    input,
    chat_history,
  });

  return [
    ...chat_history,
    { role: "user", content: input },
    { role: "assistant", content: result.output },
  ];
};
