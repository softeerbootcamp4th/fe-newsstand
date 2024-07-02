import { RecentNewsList } from "../models/News";

export const getRecentNewsList = (): RecentNewsList[] => {
  return [
    {
      mediaId: 1,
      news: {
        title: "test1",
        href: "#",
        imgSrc: "https://picsum.photos/200",
      },
    },
    {
      mediaId: 1,
      news: {
        title: "test2",
        href: "#",
        imgSrc: "https://picsum.photos/200",
      },
    },
  ];
};
