import { Div, Span } from "../../libs/Elements";
import { MediaIdByCategories } from "../../models/Newsstand";
import styles from "./CategoryNav.module.css";
import typoStyles from "@/styles/typo.module.css";
interface CategoryNavProps {
  currentMediaIdsAndCategory: MediaIdByCategories[0];
  currentMediaIdx: number;
  isActive: boolean;
  handleCategoryClick: () => void;
}
export const CategoryNav = ({
  currentMediaIdsAndCategory,
  currentMediaIdx,
  isActive,
  handleCategoryClick,
}: CategoryNavProps) => {
  return Div({
    className: `${styles.container} ${
      isActive
        ? `${typoStyles["selected-bold14"]} ${styles["active"]}`
        : `${typoStyles["available-medium14"]} ${styles["in-active"]}`
    }`,
    onClick: () => {
      if (isActive) return;
      handleCategoryClick();
    },
    children: [
      Span({
        children: [currentMediaIdsAndCategory.category.name],
      }),
      isActive &&
        Span({
          children: [
            `${currentMediaIdx + 1}`,
            Span({
              style: {
                opacity: "0.7",
              },
              children: [`/${currentMediaIdsAndCategory.mediaIds.length}`],
            }),
          ],
        }),
    ],
  });
};
