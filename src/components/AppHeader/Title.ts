import { Div, Span } from "@/libs/Elements";
import { formatDate } from "@/utils/formatDate";
import { Icon } from "./Icon";
import styles from "./title.module.css";
import typoStyles from "@/styles/typo.module.css";
export const Title = () => {
  return Div({
    className: `${styles.container}`,
    children: [
      Span({
        className: `${styles.logo} ${typoStyles["display-bold24"]}`,
        children: [Icon(), "뉴스스탠드"],
      }),
      Span({
        className: `${styles.date} ${typoStyles["display-medium16"]}`,
        children: [formatDate(new Date())],
      }),
    ],
  });
};
