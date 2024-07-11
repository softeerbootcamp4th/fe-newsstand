import { Div, Span, ce } from "@/libs";
import typoStyles from "@/styles/typo.module.css";
import styles from "./ContentFilter.module.css";
import { MediaContentFilterType } from "@/models/MediaContentFilter";
interface ContentFilterProps {
  currentFilter: MediaContentFilterType;
  setCurrentFilter: (newFilter: MediaContentFilterType) => void;
}
export const ContentFilter = ({
  currentFilter,
  setCurrentFilter,
}: ContentFilterProps) => {
  const activeStyle = `${styles.nav} ${typoStyles["selected-bold16"]} ${styles.active}`;
  const inactveStyle = `${styles.nav} ${typoStyles["available-medium16"]} ${styles.inactive}`;
  const filters: MediaContentFilterType[] = [
    "전체 언론사",
    "내가 구독한 언론사",
  ];
  return ce(Div, {
    className: styles.container,
    children: [
      ...filters.map((filter) =>
        ce(Span, {
          className: filter == currentFilter ? activeStyle : inactveStyle,
          children: [filter],
          onClick: () => setCurrentFilter(filter),
        }),
      ),
    ],
  });
};
