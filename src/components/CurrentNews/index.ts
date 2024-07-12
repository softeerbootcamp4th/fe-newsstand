import { Div, cc } from "@/libs";
import styles from "./index.module.css";
import { RollingNews } from "./RollingNews";

export const CurrentNews = () => {
  return cc(Div, {
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
