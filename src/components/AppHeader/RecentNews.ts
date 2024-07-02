import { A, Div, Span } from "../../libs/Elements";
import { News } from "../../models/News";
import { getMediaById } from "../../remotes/getMediaById";
import typoStyles from "@/styles/typo.module.css";
import styles from "./RecentNews.module.css";

export const RecentNews = ({
  mediaId,
  news,
  setIsHovering,
}: {
  mediaId: number;
  news: News;
  setIsHovering: (isHovering: boolean) => void;
}) => {
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
