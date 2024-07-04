import { Section } from "../../libs/Elements";
import styles from "./TopSection.module.css";
import { RecentNewsRoll } from "./RecentNewsRoll";
import { useEffect, useState } from "@/libs/createApp";
export const TopSection = () => {
  const [showDelayed, setShowDelayed] = useState("top-section", false);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowDelayed(true);
    }, 1000);
    return () => {
      clearTimeout(timeout);
    };
  });
  return Section({
    className: `${styles.container}`,
    children: [
      RecentNewsRoll({
        needDelay: false,
      }),
      showDelayed ? RecentNewsRoll({ needDelay: true }) : "",
    ],
  });
};
