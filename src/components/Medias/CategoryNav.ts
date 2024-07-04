import { Div, Span } from "../../libs/Elements";
import { MediaIdByCategories } from "../../models/Newsstand";

interface CategoryNavProps {
  currentMediaIdsAndCategory: MediaIdByCategories[0];
}
export const CategoryNav = ({
  currentMediaIdsAndCategory,
}: CategoryNavProps) => {
  return Div({
    children: [
      Span({
        children: [currentMediaIdsAndCategory.category.name],
      }),
      Span({
        children: [currentMediaIdsAndCategory.mediaIds.length],
      }),
    ],
  });
};
