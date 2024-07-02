import { Header, Span } from "../../libs/Elements";
import { formatDate } from "../../utils/formatDate";
import { Icon } from "./Icon";
import typoStyles from "../../styles/typo.module.css";
import styles from "./index.module.css";
export const AppHeader = () => {
  return Header({
    className: `${styles.container}`,
    children: [
      Span({
        className: `${typoStyles["display-bold24"]}`,
        children: [Icon(), "뉴스스탠드"],
      }),
      Span({
        children: [formatDate(new Date())],
      }),
    ],
  });
};
