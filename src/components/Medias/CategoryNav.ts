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
  const currentProgress =
    (currentMediaIdx + 1) / currentMediaIdsAndCategory.mediaIds.length;
  return Div({
    style: {
      background: isActive
        ? `linear-gradient(to right, #4362D0 ${
            currentProgress * 100
          }%, #7890E7 0%)`
        : "inherit",
    },
    className: `${styles.container} ${
      isActive
        ? `${typoStyles["selected-bold14"]} ${styles["active"]}`
        : `${typoStyles["available-medium14"]} ${styles["in-active"]}`
    }`,
    onClick: () => handleCategoryClick(),
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
