import { MediaRecentNewsList } from "../models/News";

export const getMediaRecentNewsByCategory = (
  mediaId: number,
  categoryId: number,
): MediaRecentNewsList => {
  return {
    data: [
      {
        title: `${mediaId} ${categoryId} 뉴스 test1`,
        href: "#",
        imgSrc: "https://picsum.photos/200",
      },
      {
        title: `${mediaId} ${categoryId} 뉴스 test2`,
        href: "#",
        imgSrc: "https://picsum.photos/200",
      },
      {
        title: `${mediaId} ${categoryId} 뉴스 test3`,
        href: "#",
        imgSrc: "https://picsum.photos/200",
      },
    ],
  };
};
