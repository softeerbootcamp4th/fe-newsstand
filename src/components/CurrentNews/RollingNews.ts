import { useEffect, useState } from "@/libs";
import { Anchor, Div, H2, Span, ce } from "@/libs/elements";
import styles from "./RollingNews.module.css";
import { getRecentNews } from "@/remotes/getRecentNews";
import { RecentNews } from "@/models/News";
import typoStyles from "@/styles/typo.module.css";
import { getMediaById } from "@/remotes/getMediaById";
import { Media } from "@/models/Media";
interface RollingNewsProps {
  delayed: boolean;
}
export const RollingNews = ({ delayed }: RollingNewsProps) => {
  const [idx, setIdx] = useState(0);
  const [recentNews, setRecentNews] = useState<RecentNews | null>(null);
  const [media, setMedia] = useState<Media | null>(null);
  const loadData = async () => {
    const recentNewsData = await getRecentNews({
      from: idx * 2 + (delayed ? 1 : 0),
    });
    setRecentNews(recentNewsData);
    const media = await getMediaById(recentNewsData.mediaId);
    setMedia(media);
  };
  useEffect(() => {
    loadData();
  }, [idx]);
  return ce(Span, {
    className: `${styles["rolling-container"]}`,
    children: [
      ce(Div, {
        className: styles.box,
        children: [
          ce(H2, {
            className: `${
              delayed ? styles["rolling-delay"] : styles["rolling"]
            } ${styles.text}`,
            children: [
              ce(Span, {
                className: `${typoStyles["display-bold14"]} ${styles["media-name"]}`,
                children: [media?.name],
              }),
              ce(Anchor, {
                className: `${typoStyles["available-medium14"]} ${styles["news-title"]}`,
                children: [recentNews?.news.title],
                href: recentNews?.news.href,
              }),
            ],
            onAnimationIteration: () => {
              setIdx(idx + 1);
            },
          }),
        ],
      }),
    ],
  });
};
