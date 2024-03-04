import { YoutubeTranscript } from "youtube-transcript";

export const getVideoIdFromUrl = (url) => {
  console.log(`getVideoIdFromUrl: ${url}`);
  let videoId = url.split("v=")[1];
  const ampersandPosition = videoId.indexOf("&");
  if (ampersandPosition !== -1) {
    videoId = videoId.substring(0, ampersandPosition);
  }
  return videoId;
};

export const convertYoutubeTranscriptJsonToString = async (
  jsonYoutubeTranscript
) => {
  let stringYoutubeTranscript = "";
  for (let i = 0; i < jsonYoutubeTranscript.length; i++) {
    if (i > 0) {
      stringYoutubeTranscript += " ";
    }
    stringYoutubeTranscript += jsonYoutubeTranscript[i].text;
  }
  return stringYoutubeTranscript;
};

export const getYoutubeTranscript = async (url) => {
  const videoId = getVideoIdFromUrl(url);
  const transcriptJson = await YoutubeTranscript.fetchTranscript(videoId);
  const transcriptString = await convertYoutubeTranscriptJsonToString(
    transcriptJson
  );
  return transcriptString;
};
