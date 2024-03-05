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
    console.log(`videoUrl`, videoUrl);
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
      console.log(summary);
      let vector = await generateEmbedding(summary);
      console.log(`vector`, vector);
      let videoInfo = await getYoutubeVideoInfo(videoUrl);
      console.log(videoInfo, "videoInfo");
      let addedVideo = await Video.create({
        ...videoInfo,
        url: videoUrl,
        summary,
        $vector: vector,
      });
      console.log(addedVideo, "addedVideo");
      console.log("Video inserted into the database");
      return {
        addedToAstra: true,
        ...addedVideo.toJSON(),
      };
    }
  } catch (e) {
    console.error(e);
  }
};
