import {
  BaseRetriever,
  type BaseRetrieverInput,
} from "@langchain/core/retrievers";
import type { CallbackManagerForRetrieverRun } from "@langchain/core/callbacks/manager";
import { Document } from "@langchain/core/documents";
import { mongoose } from "./astradb-mongoose"; // Adjust the import path as necessary
import { generateEmbedding } from "./generateEmbedding"; // Adjust the import path as necessary

export interface CustomRetrieverInput extends BaseRetrieverInput {}

export class CustomRetriever extends BaseRetriever {
  lc_namespace = ["langchain", "retrievers"];

  constructor(fields?: CustomRetrieverInput) {
    super(fields);
  }

  async _getRelevantDocuments(
    query: string,
    runManager?: CallbackManagerForRetrieverRun
  ): Promise<Document[]> {
    // Generate the embedding for the query
    const embedding = await generateEmbedding(query);

    // Query your MongoDB database using the generated embedding
    const videos = await mongoose
      .model("Video")
      .find(
        {},
        { title: 1, url: 1, summary: 1, author: 1, $vector: 1 },
        { includeSimilarity: true }
      )
      .sort({ $vector: { $meta: embedding } })
      .limit(3)
      .lean();

    // Convert the query results into Langchain Document objects
    const documents = videos.map(
      (video) =>
        new Document({
          pageContent: `${video.title}. ${video.summary}`,
          metadata: {
            title: video.title,
            url: video.url,
            author: video.author,
            thumbnail: video.thumbnail,
            author_thumbnail: video.author_thumbnail,
          },
        })
    );

    return documents;
  }
}
