import { Div, ce } from "@/libs";
import styles from "./index.module.css";
import { RollingNews } from "./RollingNews";
import { cc } from "@/libs";

export const CurrentNews = () => {
  return ce(Div, {
    className: styles.container,
    children: [
      cc(RollingNews, {
        delayed: false,
      }),
      cc(RollingNews, {
        delayed: true,
      }),
    ],
  });
};
