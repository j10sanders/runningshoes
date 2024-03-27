import { createRetrieverTool } from "langchain/tools/retriever";
import { CustomRetriever } from "./customRetriever";

const customRetrieverInstance = new CustomRetriever();

export const videoRetrieverTool = createRetrieverTool(customRetrieverInstance, {
  name: "running_shoe_video_search",
  description: "Retrieves related videos based on the query context.",
});

export const tools = [videoRetrieverTool];
