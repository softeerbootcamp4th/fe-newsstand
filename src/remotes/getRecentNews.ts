import { RecentNews } from "../models/News";

// TODO change file name
interface GetRecentNewsProps {
  from: number;
  limit?: number;
}
export const getRecentNews = ({
  from,
  limit = 2,
}: GetRecentNewsProps): RecentNews => {
  return {
    mediaId: 1,
    news: {
      title: `test${from}${from}${from}${from}${from}`,
      href: "#",
      imgSrc: "https://picsum.photos/200",
    },
  };
};
