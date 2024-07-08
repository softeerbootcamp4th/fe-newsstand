import { NewspaperIcon } from "@/assets/NewspaperIcon";
import { Div, H1, Span, ce } from "@/libs/elements";
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
          ce(NewspaperIcon, {}),
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
