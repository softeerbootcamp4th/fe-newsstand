import { NewspaperIcon } from "@/assets/NewspaperIcon";
import { Div, H1, Raw, Span, ce } from "@/libs";
import typoStyles from "@/styles/typo.module.css";
import styles from "./index.module.css";
import { formatHeaderDate } from "@/utils/formatDate";
export const AppHeader = () => {
  return ce(Div, {
    className: styles.container,
    children: [
      ce(Span, {
        className: styles["sub-container"],
        children: [
          Raw(NewspaperIcon),
          ce(H1, {
            className: typoStyles["display-bold24"],
            children: ["뉴스스탠드"],
          }),
        ],
      }),
      ce(Span, {
        className: `${styles.date} ${typoStyles["display-medium16"]}`,
        children: [formatHeaderDate(new Date())],
      }),
    ],
  });
};
