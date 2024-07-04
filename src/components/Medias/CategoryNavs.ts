import { Div } from "@/libs/Elements";
import { MediaIdByCategories } from "@/models/Newsstand";
import { CategoryNav } from "./CategoryNav";
import styles from "./CategoryNavs.module.css";
interface CategoryNavsProps {
  mediaIdByCategories: MediaIdByCategories;
  currentCategoryIdx: number;
  handleCategoryClick: (idx: number) => void;
  currentMediaIdx: number;
}
export const CategoryNavs = ({
  mediaIdByCategories,
  currentCategoryIdx,
  handleCategoryClick,
  currentMediaIdx,
}: CategoryNavsProps) => {
  return Div({
    className: `${styles.container}`,
    children: [
      ...mediaIdByCategories.map((mediaIdByCategory, idx) => {
        return CategoryNav({
          currentMediaIdsAndCategory: mediaIdByCategory,
          currentMediaIdx,
          isActive: currentCategoryIdx === idx,
          handleCategoryClick: () => handleCategoryClick(idx),
        });
      }),
    ],
  });
};
