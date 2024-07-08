import { useState } from "@/libs";
import { H1, Span, ce } from "@/libs/elements";
import styles from "./RollingNews.module.css";
export const RollingNews = () => {
  const [idx, setIdx] = useState(0);
  return ce(Span, {
    className: styles["rolling-container"],
    children: [
      ce(H1, {
        className: styles.rolling,
        children: [`RollingNews ${idx}`],
      }),
    ],
  });
};
