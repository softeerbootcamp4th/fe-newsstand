import { A, Div, Span } from "../../libs/Elements";
import { getMediaById } from "../../remotes/getMediaById";
import typoStyles from "@/styles/typo.module.css";
import styles from "./RecentNewsRoll.module.css";
import { useState, useEffect } from "@/libs/createApp";
import { getRecentNews } from "@/remotes/getRecentNewsList";

export const RecentNewsRoll = ({ differ }: { differ: number }) => {
  const [getIsHovering, setIsHovering] = useState(false);
  const [getFrom, setFrom] = useState(0);

  const { news, mediaId } = getRecentNews({
    from: getFrom() * 2 + differ,
    limit: 2,
  });
  useEffect(() => {
    const interval = setInterval(() => {
      if (getIsHovering()) return;
      setFrom(getFrom() + 1);
    }, 5000);
    return () => {
      clearInterval(interval);
    };
  });
  const media = getMediaById(mediaId);

  return Div({
    className: `${styles.box}`,
    children: [
      A({
        href: news.href,
        onHover: () => {
          setIsHovering(true);
        },
        onLeave: () => setIsHovering(false),
        className: `${styles.link}`,
        children: [
          Span({
            className: `${styles["animation-box"]}`,
            children: [
              Span({
                className: `${typoStyles["display-bold14"]}`,
                children: [media.name],
              }),
              Span({
                children: [news.title],
              }),
            ],
          }),
        ],
      }),
    ],
  });
};
