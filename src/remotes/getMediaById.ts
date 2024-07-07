import { Media } from "../models/Media";

export const getMediaById = (mediaId: number): Media => {
  return {
    id: mediaId,
    name: `뉴스 ${mediaId}`,
    imgSrc: "https://via.placeholder.com/150",
  };
};
