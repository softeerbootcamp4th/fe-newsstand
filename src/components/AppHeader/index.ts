import { Header, Span } from "../../libs/Elements";
import { formatDate } from "../../utils/formatDate";
import { Icon } from "./Icon";

import styles from "./index.module.css";
export const AppHeader = () => {
  return Header({
    className: styles.container,
    children: [
      Span({
        children: [Icon(), "뉴스스탠드"],
      }),
      Span({
        children: [formatDate(new Date())],
      }),
    ],
  });
};
