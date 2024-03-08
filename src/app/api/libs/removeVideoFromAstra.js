import { getYoutubeTranscript } from "./getYoutubeTranscript";
import { generateEmbedding } from "./generateEmbedding";
import { getYoutubeVideoInfo } from "./getYoutubeVideoInfo";
import { addGPTSummary } from "./addChatGPTresponse";
import dbConnect from "./dbConnect";
import { mongoose } from "./astradb-mongoose";

export const removeFromAstra = async (url) => {
  await dbConnect();
  try {
    const Video = mongoose.model("Video");
    await Video.deleteOne({ url });
    console.log("Video deleted from the database");
  } catch (e) {
    console.error(e);
  }
};
