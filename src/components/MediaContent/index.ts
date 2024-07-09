import { Div, Main, ce } from "@/libs/elements";
import { MediaContentFilter } from "./MediaContentFilter";
import { useEffect, useState } from "@/libs";
import { cc } from "@/libs/components";
import { getMediaIdByCategories } from "@/remotes/getMediaIdByCategories";
import { MediaIdByCategories } from "@/models/Newsstand";
import { MediaContentTabs } from "./MediaContentTabs";
import styles from "./index.module.css";
import { CategoryTabActiveBadge } from "./CategoryTabActiveBadge";
import { MediaContentMain } from "./MediaContentMain";
export type MediaContentFilterType = "전체 언론사" | "내가 구독한 언론사";

export const MediaContent = () => {
  const [currentFilter, setCurrentFilter] =
    useState<MediaContentFilterType>("전체 언론사");

  const [currentData, setCurrentData] = useState<MediaIdByCategories | null>(
    null,
  );
  const loadData = async () => {
    const data = await getMediaIdByCategories();
    setCurrentData(data);
  };
  useEffect(() => {
    loadData();
  }, []);

  if (currentData === null) {
    return null;
  }
  const [currentDataIdx, setCurrentDataIdx] = useState<[number, number]>([
    0, 0,
  ]);

  const handleNext = () => {
    if (
      currentDataIdx[1] + 1 <
      currentData[currentDataIdx[0]].mediaIds.length
    ) {
      setCurrentDataIdx([currentDataIdx[0], currentDataIdx[1] + 1]);
      return;
    }
    if (currentDataIdx[0] + 1 < currentData.length) {
      setCurrentDataIdx([currentDataIdx[0] + 1, 0]);
      return;
    }
  };

  const handlePrev = () => {
    if (currentDataIdx[1] - 1 >= 0) {
      setCurrentDataIdx([currentDataIdx[0], currentDataIdx[1] - 1]);
      return;
    }
    if (currentDataIdx[0] - 1 >= 0) {
      setCurrentDataIdx([currentDataIdx[0] - 1, 0]);
      return;
    }
  };

  const handleClick = (idx: [number, number]) => {
    setCurrentDataIdx(idx);
  };

  const currentMediaId =
    currentData[currentDataIdx[0]].mediaIds[currentDataIdx[1]];
  const currentCategory = currentData[currentDataIdx[0]].category;
  const tabData = currentData.map((data, idx) => {
    const isActive = idx === currentDataIdx[0];
    return {
      main: data.category.name,
      sub: isActive
        ? cc(CategoryTabActiveBadge, {
            curIdx: currentDataIdx[1],
            total: data.mediaIds.length,
          })
        : null,
      isActive: isActive,
      onClick: () => {
        handleClick([idx, 0]);
      },
      onNext: handleNext,
    };
  });

  return ce(Div, {
    className: styles.container,
    children: [
      cc(MediaContentFilter, {
        currentFilter: currentFilter,
        setCurrentFilter: setCurrentFilter,
      }),
      ce(Main, {
        children: [
          cc(MediaContentTabs, {
            tabs: tabData,
          }),
          cc(MediaContentMain, {
            mediaId: currentMediaId,
            category: currentCategory,
            handleNext: handleNext,
            handlePrev,
          }),
        ],
      }),
    ],
  });
};
