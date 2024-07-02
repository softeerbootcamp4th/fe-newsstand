import { useState, useEffect } from "../../libs/createApp";
import { A, Section, Span } from "../../libs/Elements";
import { News, RecentNewsList } from "../../models/News";
import { getMediaById } from "../../remotes/getMediaById";
import { getRecentNewsList } from "../../remotes/getRecentNewsList";

const RecentNews = ({ mediaId, news }: { mediaId: number; news: News }) => {
  const media = getMediaById(mediaId);

  return A({
    href: news.href,
    children: [
      Span({
        children: [media.name],
      }),
      Span({
        children: [news.title],
      }),
    ],
  });
};
export const TopSection = () => {
  const [getFrom, setFrom] = useState(0);
  const recentNewsList: RecentNewsList[] = getRecentNewsList({
    from: getFrom(),
    limit: 2,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setFrom(getFrom() + 2);
    }, 51000);
    return () => {
      clearInterval(interval);
    };
  });
  return Section({
    children: recentNewsList.map((recentNews) =>
      RecentNews({
        mediaId: recentNews.mediaId,
        news: recentNews.news,
      }),
    ),
  });
};
