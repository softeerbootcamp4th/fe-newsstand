import { getMediaIdByCategories } from "@/remotes/getMediaIdByCategories";
import { useCallback, useEffect, useState } from "../../libs/createApp";
import { Div, Section } from "../../libs/Elements";
import { CategoryNavs } from "./CategoryNavs";
import { MediasContent } from "./MediasContent";
import { CurrentFilterToggler } from "./CurrentFilterToggler";
import styles from "./Medias.module.css";
export const Medias = () => {
  const [currentFilter, setCurrentFilter] = useState<
    "전체 언론사" | "내가 구독한 언론사"
  >({
    key: "Medias",
    initalState: "전체 언론사",
  });

  const [currentCategoryIdx, setCurrentCategoryIdx] = useState({
    key: "Medias",
    initalState: 0,
  });

  const [currentMediaIdx, setCurrentMediaIdx] = useState({
    key: "Medias",
    initalState: 0,
  });

  const mediaIdByCategories = getMediaIdByCategories();
  const hasNextCategory = currentCategoryIdx < mediaIdByCategories.length - 1;
  const hasPrevCategory = currentCategoryIdx > 0;

  const hasNext =
    currentMediaIdx <
      mediaIdByCategories[currentCategoryIdx].mediaIds.length - 1 ||
    hasNextCategory;
  const hasPrev = currentMediaIdx > 0 || hasPrevCategory;
  const handleMediaNext = useCallback(
    {
      key: "Medias",
      callback: () => {
        if (
          currentMediaIdx ===
          mediaIdByCategories[currentCategoryIdx].mediaIds.length - 1
        ) {
          if (!hasNextCategory) return;
          setCurrentCategoryIdx(currentCategoryIdx + 1);
          setCurrentMediaIdx(0);
          return;
        }
        setCurrentMediaIdx(currentMediaIdx + 1);
      },
    },
    [currentMediaIdx, mediaIdByCategories, currentCategoryIdx, hasNextCategory],
  );

  const handleMediaPrev = () => {
    if (currentMediaIdx === 0) {
      if (!hasPrevCategory) return;
      setCurrentCategoryIdx(currentCategoryIdx - 1);
      setCurrentMediaIdx(
        mediaIdByCategories[currentCategoryIdx - 1].mediaIds.length - 1,
      );
      return;
    }
    setCurrentMediaIdx(currentMediaIdx - 1);
  };

  const handleCategoryClick = useCallback(
    {
      key: "Medias",
      callback: (idx: number) => {
        setCurrentCategoryIdx(idx);
        setCurrentMediaIdx(0);
      },
    },
    [],
  );

  useEffect(
    {
      key: "Medias",
      effectFunc: () => {
        const timeout = setTimeout(() => {
          handleMediaNext();
        }, 20000);

        return () => {
          clearTimeout(timeout);
        };
      },
    },
    [handleMediaNext],
  );
  const currentMediaIdsAndCategory = mediaIdByCategories[currentCategoryIdx];
  return Section({
    className: styles.container,
    children: [
      CurrentFilterToggler({
        currentFilter: currentFilter,
        setCurrentFilter: setCurrentFilter,
      }),
      Div({
        children: [
          CategoryNavs({
            mediaIdByCategories: mediaIdByCategories,
            currentCategoryIdx: currentCategoryIdx,
            handleCategoryClick: handleCategoryClick,
            currentMediaIdx: currentMediaIdx,
          }),
          MediasContent({
            currentMediaIdsAndCategory: currentMediaIdsAndCategory,
            currentMediaIdx: currentMediaIdx,
            handleMediaNext,
            handleMediaPrev,
            hasNext,
            hasPrev,
          }),
        ],
      }),
    ],
  });
};
