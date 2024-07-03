import { Header } from "../../libs/Elements";
import styles from "./index.module.css";
import { Title } from "./Title";
import { TopSection } from "./TopSection";

export const AppHeader = () => {
  return Header({
    className: `${styles.container}`,
    children: [Title(), TopSection()],
  });
};
