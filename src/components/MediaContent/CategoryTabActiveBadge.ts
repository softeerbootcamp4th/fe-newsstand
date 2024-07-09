import { ce, Span } from "@/libs/elements";
import styles from "./CategoryTabActiveBadge.module.css";
interface CategoryTabActiveBadgeProps {
  curIdx: number;
  total: number;
}
export const CategoryTabActiveBadge = ({
  curIdx,
  total,
}: CategoryTabActiveBadgeProps) => {
  return ce(Span, {
    children: [
      `${curIdx + 1}`,
      ce(Span, { className: styles.week, children: [`/${total}`] }),
    ],
  });
};
