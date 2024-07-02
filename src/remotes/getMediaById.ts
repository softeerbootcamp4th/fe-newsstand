import { Media } from "../models/Media";

export const getMediaById = (mediaId: number): Media => {
  return {
    id: mediaId,
    name: "뉴스1",
    imgSrc: "https://via.placeholder.com/150",
  };
};
