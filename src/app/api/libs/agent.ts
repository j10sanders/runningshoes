import { ChatOpenAI } from "@langchain/openai";
const llm = new ChatOpenAI({ temperature: 0 });
import { tools } from "./langchainTools";
import { createOpenAIToolsAgent, AgentExecutor } from "langchain/agents";
import { pull } from "langchain/hub";
import type { ChatPromptTemplate } from "@langchain/core/prompts";

import { PromptTemplate } from "@langchain/core/prompts";

const prompt = await pull<ChatPromptTemplate>("hwchase17/openai-tools-agent");
//jonaerwawer/running

const agent = await createOpenAIToolsAgent({
  llm,
  tools,
  prompt,
});
const agentExecutor = new AgentExecutor({
  agent,
  tools,
});
