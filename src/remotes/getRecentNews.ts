import { sleep } from "@/utils/sleep";
import { RecentNews } from "../models/News";

interface GetRecentNewsProps {
  from: number;
  limit?: number;
}
export const getRecentNews = async ({
  from,
  limit = 2,
}: GetRecentNewsProps): Promise<RecentNews> => {
  await sleep();
  return {
    mediaId: 1,
    news: {
      title: `test${from} 속보!!`,
      href: "#",
      imgSrc: "https://picsum.photos/200",
    },
  };
};
