import { createRetrieverTool } from "langchain/tools/retriever";
import { CustomRetriever } from "./customRetriever"; // Adjust the import path as necessary

// Create an instance of CustomRetriever
const customRetrieverInstance = new CustomRetriever();

// Use the instance to create the retriever tool
const videoRetrieverTool = createRetrieverTool(customRetrieverInstance, {
  name: "video_search",
  description: "Retrieves related videos based on the query context.",
});
