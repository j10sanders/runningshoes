import { createRetrieverTool } from "langchain/tools/retriever";
import { CustomRetriever } from "./customRetriever";

const customRetrieverInstance = new CustomRetriever();

const videoRetrieverTool = createRetrieverTool(customRetrieverInstance, {
  name: "video_search",
  description: "Retrieves related videos based on the query context.",
});
