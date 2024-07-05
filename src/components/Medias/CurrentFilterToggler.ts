import { Div, Header, Span } from "../../libs/Elements";
import typoStyles from "@/styles/typo.module.css";
import styles from "./CurrentFilterToggler.module.css";
import { GridViewIcon, ListViewIcon } from "./ViewIcons";
export interface CurrentCategoryTogglerProps {
  currentFilter: "전체 언론사" | "내가 구독한 언론사";
  setCurrentFilter: (category: "전체 언론사" | "내가 구독한 언론사") => void;
}

export const CurrentFilterToggler = ({
  currentFilter,
  setCurrentFilter,
}: CurrentCategoryTogglerProps) => {
  const activeClassName = `${typoStyles["selected-bold16"]} ${styles["toggler-active"]}`;
  const inactiveClassName = `${typoStyles["available-medium16"]} ${styles["toggler-inactive"]}`;
  return Header({
    className: `${styles["container"]}`,
    children: [
      Div({
        className: `${styles["toggler-box"]}`,
        children: [
          Span({
            className: `${styles.toggler} ${
              currentFilter === "전체 언론사"
                ? activeClassName
                : inactiveClassName
            }`,
            children: ["전체 언론사"],
            onClick: () => {
              setCurrentFilter("전체 언론사");
            },
          }),
          Span({
            className: `${styles.toggler} ${
              currentFilter === "내가 구독한 언론사"
                ? activeClassName
                : inactiveClassName
            }`,
            children: ["내가 구독한 언론사"],
            onClick: () => {
              setCurrentFilter("내가 구독한 언론사");
            },
          }),
        ],
      }),
      Div({
        className: `${styles["icons-box"]}`,
        children: [ListViewIcon(), GridViewIcon()],
      }),
    ],
  });
};
