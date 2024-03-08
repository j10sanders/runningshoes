import mongoose from "mongoose";
import { driver, createAstraUri } from "stargate-mongoose";

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

export { mongoose };
