import { A, Div, Span } from "../../libs/Elements";
import { getMediaById } from "../../remotes/getMediaById";
import typoStyles from "@/styles/typo.module.css";
import styles from "./RecentNewsRoll.module.css";
import { useState, useEffect, useCallback } from "@/libs/createApp";
import { getRecentNews } from "@/remotes/getRecentNews";

export const RecentNewsRoll = ({ needDelay }: { needDelay: boolean }) => {
  const [isHovering, setIsHovering] = useState({
    key: "RecentNewsRoll",
    initalState: false,
  });
  const [from, setFrom] = useState({
    key: "RecentNewsRoll",
    initalState: 0,
  });

  const { news, mediaId } = getRecentNews({
    from: from * 2 + (needDelay ? 1 : 0),
    limit: 2,
  });
  const update = () => {
    if (isHovering) return;
    setFrom(from + 1);
  };
  useEffect(() => {
    const interval = setInterval(update, 5000);
    return () => {
      clearInterval(interval);
    };
  }, [from]);
  const media = getMediaById(mediaId);

  const handleHover = useCallback(
    {
      key: "RecentNewsRoll",
      callback: () => {
        setIsHovering(true);
      },
    },
    [],
  );
  const handleLeave = useCallback(
    {
      key: "RecentNewsRoll",
      callback: () => {
        setIsHovering(false);
      },
    },
    [],
  );

  return Div({
    className: `${styles.box}`,
    children: [
      A({
        href: news.href,
        onHover: handleHover,
        onLeave: handleLeave,
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
