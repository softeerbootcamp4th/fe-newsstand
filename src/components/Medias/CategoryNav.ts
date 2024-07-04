import { Div, Span } from "../../libs/Elements";
import { MediaIdByCategories } from "../../models/Newsstand";

interface CategoryNavProps {
  currentMediaIdsAndCategory: MediaIdByCategories[0];
  currentMediaIdx: number;
  isActive: boolean;
}
export const CategoryNav = ({
  currentMediaIdsAndCategory,
  currentMediaIdx,
  isActive,
}: CategoryNavProps) => {
  const currentProgress =
    (currentMediaIdx + 1) / currentMediaIdsAndCategory.mediaIds.length;
  return Div({
    style: {
      background: isActive
        ? `linear-gradient(to right, #4CAF50 ${
            currentProgress * 100
          }%, #f1f1f1 0%)`
        : "inherit",
    },
    children: [
      Span({
        children: [currentMediaIdsAndCategory.category.name],
      }),
      isActive &&
        Span({
          children: [
            `${currentMediaIdx + 1}/${
              currentMediaIdsAndCategory.mediaIds.length
            }`,
          ],
        }),
    ],
  });
};
