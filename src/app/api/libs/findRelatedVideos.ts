import dbConnect from "./dbConnect";
import { generateEmbedding } from "./generateEmbedding";
import { mongoose } from "./astradb-mongoose";

export type VideosCleaned = {
  title: string;
  author: string;
  url: string;
  summary: string;
};

export const findVideos = async (query: string) => {
  await dbConnect();
  const embedding = await generateEmbedding(query);
  const videos = await mongoose
    .model("Video")
    .find(
      {},
      { title: 1, url: 1, summary: 1, author: 1, $vector: 1 },
      { includeSimilarity: true }
    )
    .sort({ $vector: { $meta: embedding } })
    .limit(3)
    .lean();

  const videosCleaned: VideosCleaned[] = videos.map((video) => {
    return {
      title: video.title,
      author: video.author,
      url: video.url,
      summary: video.summary,
    };
  });

  return videosCleaned;
};
