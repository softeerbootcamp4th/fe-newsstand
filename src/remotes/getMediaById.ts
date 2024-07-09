import { sleep } from "@/utils/sleep";
import { Media } from "../models/Media";

export const getMediaById = async (mediaId: number): Promise<Media> => {
  await sleep();

  const isSubscribed = localStorage.getItem(`media-${mediaId}`) === "true";
  return {
    id: mediaId,
    name: `뉴스 ${mediaId}`,
    imgSrc: "https://via.placeholder.com/150",
    lastEdited: new Date().toISOString(),
    isSubscribed: isSubscribed,
  };
};
