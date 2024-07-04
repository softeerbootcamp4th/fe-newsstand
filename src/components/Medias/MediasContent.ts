import { MediaIdByCategories } from "../../models/Newsstand";
import { getMediaById } from "../../remotes/getMediaById";
import { getMediaRecentNewsByCategory } from "../../remotes/getMediaRecentNewsList";

interface MediasContentProps {
  currentMediaIdsAndCategory: MediaIdByCategories[0];
}
export const MediasContent = ({
  currentMediaIdsAndCategory,
}: MediasContentProps) => {
  const currentMedia = getMediaById(currentMediaIdsAndCategory.mediaIds[0]);
  const recentNewsList = getMediaRecentNewsByCategory(
    currentMedia.id,
    currentMediaIdsAndCategory.category.id,
  );

  return "";
};
