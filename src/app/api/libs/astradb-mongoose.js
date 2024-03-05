import mongoose from "mongoose";
import { driver, createAstraUri } from "stargate-mongoose";

export const connectToAstraDb = async () => {
  // console.log(process.env);
  // const uri = createAstraUri(
  //   process.env.ASTRA_DB_ID,
  //   process.env.ASTRA_DB_REGION,
  //   process.env.ASTRA_DB_KEYSPACE,
  //   process.env.ASTRA_DB_APPLICATION_TOKEN
  // );

  const uri = createAstraUri(
    process.env.ASTRA_DB_ENDPOINT,
    process.env.ASTRA_DB_APPLICATION_TOKEN,
    process.env.ASTRA_DB_KEYSPACE
  );
  console.log("hello");

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
