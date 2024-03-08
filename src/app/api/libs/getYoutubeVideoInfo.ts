import ytdl from "ytdl-core";

export const getYoutubeVideoInfo = async (url: string) => {
  try {
    let info = await ytdl.getInfo(url);
    const videoDetails = info.videoDetails;
    const author = videoDetails.author;
    const videoInfo = {
      url: videoDetails.video_url,
      title: videoDetails.title,
      description: videoDetails.description,
      author: author.name,
      author_thumbnail: author.thumbnails
        ? author.thumbnails[author.thumbnails.length - 1].url
        : undefined,
      thumbnail:
        videoDetails.thumbnails[videoDetails.thumbnails.length - 1].url,
    };

    return videoInfo;
  } catch (e) {
    console.error(e);
  }
};
