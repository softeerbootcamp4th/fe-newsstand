import { useState, useEffect } from "../../libs/createApp";
import { Section } from "../../libs/Elements";
import { RecentNewsList } from "../../models/News";
import { getRecentNewsList } from "../../remotes/getRecentNewsList";
import styles from "./TopSection.module.css";
import { RecentNews } from "./RecentNews";
export const TopSection = () => {
  const [getFrom, setFrom] = useState(0);
  const [getIsHovering, setIsHovering] = useState(false);
  const recentNewsList: RecentNewsList[] = getRecentNewsList({
    from: getFrom(),
    limit: 2,
  });
  useEffect(() => {
    const interval = setInterval(() => {
      if (getIsHovering()) return;
      setFrom(getFrom() + 2);
    }, 512000);
    return () => {
      clearInterval(interval);
    };
  });
  return Section({
    className: `${styles.container}`,
    children: recentNewsList.map((recentNews) =>
      RecentNews({
        mediaId: recentNews.mediaId,
        news: recentNews.news,
        setIsHovering: setIsHovering,
      }),
    ),
  });
};
