import mongoose from "mongoose";
import { connectToAstraDb, initMongooseVideoModel } from "./astradb-mongoose";

const dbConnect = async () => {
  if (mongoose.connection.readyState) {
    return;
  }
  await connectToAstraDb();
  await initMongooseVideoModel(); // Ensure the Video model is initialized
};

export default dbConnect;
