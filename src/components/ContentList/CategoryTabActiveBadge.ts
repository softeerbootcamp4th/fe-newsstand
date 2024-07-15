import { cc, Span } from "@/libs";
import styles from "./CategoryTabActiveBadge.module.css";
interface CategoryTabActiveBadgeProps {
  curIdx: number;
  total: number;
}
export const CategoryTabActiveBadge = ({
  curIdx,
  total,
}: CategoryTabActiveBadgeProps) => {
  return cc(Span, {
    children: [
      `${curIdx + 1}`,
      cc(Span, { className: styles.week, children: [`/${total}`] }),
    ],
  });
};
