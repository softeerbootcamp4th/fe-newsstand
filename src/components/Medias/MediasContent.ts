import { Button, Div } from "@/libs/Elements";
import { MediaIdByCategories } from "../../models/Newsstand";
import { getMediaById } from "../../remotes/getMediaById";
import { getMediaRecentNewsByCategory } from "../../remotes/getMediaRecentNewsList";
import { useEffect } from "@/libs/createApp";

interface MediasContentProps {
  currentMediaIdsAndCategory: MediaIdByCategories[0];
  currentMediaIdx: number;
  handleMediaNext: () => void;
  handleMediaPrev: () => void;
}
export const MediasContent = ({
  currentMediaIdsAndCategory,
  handleMediaNext,
  handleMediaPrev,
  currentMediaIdx,
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
    }, 5000);

    return () => {
      clearTimeout(timeout);
    };
  }, [currentMediaIdx, currentMediaIdsAndCategory]);
  return Div({
    children: [
      Div({
        children: [
          ...recentNewsList.map((news) => {
            return Div({
              children: [news.title],
            });
          }),
        ],
      }),
      Button({
        children: ["이전"],
        onClick: () => {
          handleMediaPrev();
        },
      }),
      Button({
        children: ["다음"],
        onClick: () => {
          handleMediaNext();
        },
      }),
    ],
  });
};
