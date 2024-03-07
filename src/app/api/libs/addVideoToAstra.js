import { getYoutubeTranscript } from "./getYoutubeTranscript";
import { generateEmbedding } from "./generateEmbedding";
import { getYoutubeVideoInfo } from "./getYoutubeVideoInfo";
import { addGPTSummary } from "./addChatGPTresponse";
import dbConnect from "./dbConnect";
import { mongoose } from "./astradb-mongoose";

export const addVideoToAstra = async (url) => {
  await dbConnect();
  try {
    const Video = mongoose.model("Video");

    const videoUrl = url;
    const existingVideo = await Video.findOne({ url: videoUrl });

    if (existingVideo) {
      console.log("Video already exists in the database");

      return {
        addedToAstra: false,
        ...existingVideo.toJSON(),
      };
    } else {
      let transcript = await getYoutubeTranscript(videoUrl);
      let summary = await addGPTSummary(transcript);
      let videoInfo = await getYoutubeVideoInfo(videoUrl);
      let vector = await generateEmbedding(`${videoInfo.title}: ${summary}`);
      let addedVideo = await Video.create({
        ...videoInfo,
        url: videoUrl,
        summary,
        $vector: vector,
      });
      console.log(addedVideo, "addedVideo");
      return {
        addedToAstra: true,
        ...addedVideo.toJSON(),
      };
    }
  } catch (e) {
    console.error(e);
  }
};
