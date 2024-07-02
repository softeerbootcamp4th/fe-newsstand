import { MediaRecentNewsList } from "../models/News";

export const getMediaRecentNewsList = (
  mediaId: number,
): MediaRecentNewsList => {
  return {
    data: [
      {
        title: "test1",
        href: "#",
        imgSrc: "https://picsum.photos/200",
      },
      {
        title: "test1",
        href: "#",
        imgSrc: "https://picsum.photos/200",
      },
      {
        title: "test1",
        href: "#",
        imgSrc: "https://picsum.photos/200",
      },
    ],
  };
};
