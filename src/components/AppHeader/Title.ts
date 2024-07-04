import { Div, Span } from "@/libs/Elements";
import { formatHeaderDate } from "@/utils/formatDate";
import { Icon } from "./Icon";
import styles from "./Title.module.css";
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
        children: [formatHeaderDate(new Date())],
      }),
    ],
  });
};
