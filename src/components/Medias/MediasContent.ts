import { Button, Div } from "@/libs/Elements";
import { MediaIdByCategories } from "../../models/Newsstand";
import { getMediaById } from "../../remotes/getMediaById";
import { getMediaRecentNewsByCategory } from "../../remotes/getMediaRecentNewsList";
import { useEffect } from "@/libs/createApp";
import styles from "./MediasContent.module.css";
import { MediaContentHeader } from "./MediaContentHeader";
import { MediaContentMain } from "./MediaContentMain";
import { LeftIcon } from "./LeftIcon";
import { RightIcon } from "./RightIcon";
interface MediasContentProps {
  currentMediaIdsAndCategory: MediaIdByCategories[0];
  currentMediaIdx: number;
  handleMediaNext: () => void;
  handleMediaPrev: () => void;
  hasNext: boolean;
  hasPrev: boolean;
}
export const MediasContent = ({
  currentMediaIdsAndCategory,
  handleMediaNext,
  handleMediaPrev,
  currentMediaIdx,
  hasNext,
  hasPrev,
}: MediasContentProps) => {
  const currentMedia = getMediaById(
    currentMediaIdsAndCategory.mediaIds[currentMediaIdx],
  );
  const recentNewsList = getMediaRecentNewsByCategory(
    currentMedia.id,
    currentMediaIdsAndCategory.category.id,
  );

  useEffect(() => {
    const timeout = setTimeout(() => {
      handleMediaNext();
    }, 20000);

    return () => {
      clearTimeout(timeout);
    };
  }, [currentMediaIdx, currentMediaIdsAndCategory]);
  return Div({
    className: `${styles.container}`,
    children: [
      MediaContentHeader({
        media: currentMedia,
      }),
      MediaContentMain({
        newsList: recentNewsList,
        media: currentMedia,
      }),
      hasPrev &&
        Button({
          className: `${styles.btn} ${styles["prev-btn"]}`,
          children: [LeftIcon()],
          onClick: () => {
            handleMediaPrev();
          },
        }),
      hasNext &&
        Button({
          className: `${styles.btn} ${styles["nxt-btn"]}`,
          children: [RightIcon()],
          onClick: () => {
            handleMediaNext();
          },
        }),
    ],
  });
};
