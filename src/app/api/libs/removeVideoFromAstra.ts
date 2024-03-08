import dbConnect from "./dbConnect";
import { mongoose } from "./astradb-mongoose";

export const removeFromAstra = async (url: string) => {
  await dbConnect();
  try {
    const Video = mongoose.model("Video");
    await Video.deleteOne({ url });
    console.log("Video deleted from the database");
  } catch (e) {
    console.error(e);
  }
};
