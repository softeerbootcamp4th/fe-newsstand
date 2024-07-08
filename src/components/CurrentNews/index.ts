import { Div, ce } from "@/libs/elements";
import styles from "./index.module.css";
import { RollingNews } from "./RollingNews";
import { cc } from "@/libs/components";

export const CurrentNews = () => {
  return ce(Div, {
    className: styles.container,
    children: [cc(RollingNews, {}), cc(RollingNews, {})],
  });
};
