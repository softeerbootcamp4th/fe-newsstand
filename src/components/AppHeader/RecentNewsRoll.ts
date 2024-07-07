import { A, Div, Span } from "../../libs/Elements";
import { getMediaById } from "../../remotes/getMediaById";
import typoStyles from "@/styles/typo.module.css";
import styles from "./RecentNewsRoll.module.css";
import { useState, useEffect } from "@/libs/createApp";
import { getRecentNews } from "@/remotes/getRecentNews";

export const RecentNewsRoll = ({ needDelay }: { needDelay: boolean }) => {
  const [from, setFrom] = useState({
    key: "RecentNewsRoll",
    initalState: 0,
  });

  const { news, mediaId } = getRecentNews({
    from: from * 2 + (needDelay ? 1 : 0),
    limit: 2,
  });
  useEffect(
    {
      key: "RecentNewsRoll",
      effectFunc: () => {
        const interval = setInterval(() => {
          setFrom(from + 1);
        }, 5000);
        return () => {
          clearInterval(interval);
        };
      },
    },
    [from],
  );
  const media = getMediaById(mediaId);

  return Div({
    className: `${styles.box}`,
    children: [
      A({
        href: news.href,
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
