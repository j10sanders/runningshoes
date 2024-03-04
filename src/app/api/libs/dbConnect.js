import mongoose from "mongoose";
import { connectToAstraDb } from "./astradb-mongoose";

const dbConnect = async () => {
  if (mongoose.connection.readyState) {
    return;
  }
  await connectToAstraDb();
};

export default dbConnect;
