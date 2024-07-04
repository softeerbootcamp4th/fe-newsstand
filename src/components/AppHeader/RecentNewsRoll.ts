import { A, Div, Span } from "../../libs/Elements";
import { getMediaById } from "../../remotes/getMediaById";
import typoStyles from "@/styles/typo.module.css";
import styles from "./RecentNewsRoll.module.css";
import { useState, useEffect } from "@/libs/createApp";
import { getRecentNews } from "@/remotes/getRecentNews";

export const RecentNewsRoll = ({ needDelay }: { needDelay: boolean }) => {
  const [isHovering, setIsHovering] = useState(false);
  const [from, setFrom] = useState(0);

  const { news, mediaId } = getRecentNews({
    from: from * 2 + (needDelay ? 1 : 0),
    limit: 2,
  });
  const update = () => {
    if (isHovering) return;
    setFrom((prev) => {
      return prev + 1;
    });
  };
  useEffect(() => {
    const interval = setInterval(update, 5000);
    return () => {
      clearInterval(interval);
    };
  }, []);
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
