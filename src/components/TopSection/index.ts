import { useState, useEffect } from "../../libs/createApp";
import { News, RecentNewsList } from "../../models/News";
import { getMediaById } from "../../remotes/getMediaById";
import { getRecentNewsList } from "../../remotes/getRecentNewsList";

const RecentNews = ({ mediaId, news }: { mediaId: number; news: News }) => {
  const media = getMediaById(mediaId);
  return `<a href=${news.href}>
    <span>
    ${media.name}
    </span>
    <span>
    ${news.title}
    </span>
  </a>`;
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
    }, 5000);
    return () => {
      clearInterval(interval);
    };
  });
  return `
    <section>
      ${recentNewsList.map((news) => RecentNews(news)).join("")}
    </section>
  `;
};
