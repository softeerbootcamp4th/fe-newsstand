import { useState } from "@/libs";
import { H1, Span, ce } from "@/libs/elements";
import styles from "./RollingNews.module.css";
interface RollingNewsProps {
  delayed: boolean;
}
export const RollingNews = ({ delayed }: RollingNewsProps) => {
  const [idx, setIdx] = useState(0);
  return ce(Span, {
    className: `${styles["rolling-container"]}`,
    children: [
      ce(H1, {
        className: delayed ? styles["rolling-delay"] : styles["rolling"],
        children: [`RollingNews ${idx}`],
        onAnimationIteration: () => {
          setIdx(idx + 1);
        },
      }),
    ],
  });
};
