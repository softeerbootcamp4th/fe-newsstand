import { RecentNewsList } from "../models/News";

interface GetRecentNewsListProps {
  from: number;
  limit?: number;
}
export const getRecentNewsList = ({
  from,
  limit = 2,
}: GetRecentNewsListProps): RecentNewsList[] => {
  return [
    {
      mediaId: 1,
      news: {
        title: `test${from}`,
        href: "#",
        imgSrc: "https://picsum.photos/200",
      },
    },
    {
      mediaId: 1,
      news: {
        title: `test${from + 1}`,
        href: "#",
        imgSrc: "https://picsum.photos/200",
      },
    },
  ];
};
