import mongoose from "mongoose";
import { driver, createAstraUri } from "stargate-mongoose";
import { generateEmbedding } from "./generateEmbedding";

export const connectToAstraDb = async () => {
  const uri = createAstraUri(
    process.env.ASTRA_DB_ENDPOINT,
    process.env.ASTRA_DB_APPLICATION_TOKEN,
    process.env.ASTRA_DB_KEYSPACE
  );

  mongoose.set("autoCreate", true);
  mongoose.setDriver(driver);

  await mongoose.connect(uri, {
    isAstra: true,
  });
};

export const initMongooseVideoModel = async () => {
  // await mongoose.connection.dropCollection("videos");
  const Video = mongoose.model(
    "Video",
    new mongoose.Schema(
      {
        title: String,
        description: String,
        url: String,
        author: String,
        thumbnail: String,
        author_thumbnail: String,
        summary: String,
        $vector: {
          type: [Number],
          validate: (vector) => vector && vector.length === 1536,
        },
      },
      {
        collectionOptions: {
          vector: {
            size: 1536,
            function: "cosine",
          },
        },
      }
    )
  );
  await Video.init();
};

export const findVideos = async (query) => {
  const embedding = await generateEmbedding(query);
  const videos = await mongoose
    .model("Video")
    .find(
      {},
      { title: 1, url: 1, summary: 1, $vector: 1 },
      { includeSimilarity: true }
    )
    .sort({ $vector: { $meta: embedding } })
    .limit(3);
};

export { mongoose };
