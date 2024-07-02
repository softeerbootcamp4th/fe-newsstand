import { Section } from "../../libs/Elements";
import styles from "./TopSection.module.css";
import { RecentNewsRoll } from "./RecentNewsRoll";
export const TopSection = () => {
  return Section({
    className: `${styles.container}`,
    children: [
      RecentNewsRoll({
        differ: 0,
      }),
      RecentNewsRoll({ differ: 1 }),
    ],
  });
};
