import { Button, Div } from "@/libs/Elements";
import { MediaIdByCategories } from "../../models/Newsstand";
import { getMediaById } from "../../remotes/getMediaById";
import { getMediaRecentNewsByCategory } from "../../remotes/getMediaRecentNewsList";

interface MediasContentProps {
  currentMediaIdsAndCategory: MediaIdByCategories[0];
  currentMediaIdx: number;
  handleMediaNext: () => void;
}
export const MediasContent = ({
  currentMediaIdsAndCategory,
  handleMediaNext,
  currentMediaIdx,
}: MediasContentProps) => {
  const currentMedia = getMediaById(
    currentMediaIdsAndCategory.mediaIds[currentMediaIdx],
  );
  const recentNewsList = getMediaRecentNewsByCategory(
    currentMedia.id,
    currentMediaIdsAndCategory.category.id,
  );
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
        children: ["다음"],
        onClick: () => {
          handleMediaNext();
        },
      }),
    ],
  });
};
