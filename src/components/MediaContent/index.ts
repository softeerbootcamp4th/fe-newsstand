import { Div, ce } from "@/libs/elements";
import { MediaContentFilter } from "./MediaContentFilter";
import { useEffect, useState } from "@/libs";
import { cc } from "@/libs/components";
import { getMediaIdByCategories } from "@/remotes/getMediaIdByCategories";
import { MediaIdByCategories } from "@/models/Newsstand";
import { MediaContentTabs } from "./MediaContentTabs";
import styles from "./index.module.css";
import { CategoryTabActiveBadge } from "./CategoryTabActiveBadge";
export type MediaContentFilterType = "전체 언론사" | "내가 구독한 언론사";

export const MediaContent = () => {
  const [currentFilter, setCurrentFilter] =
    useState<MediaContentFilterType>("전체 언론사");

  const [currentData, setCurrentData] = useState<MediaIdByCategories>([]);
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

  const handleClick = (idx: [number, number]) => {
    setCurrentDataIdx(idx);
  };
  const loadData = async () => {
    const data = await getMediaIdByCategories();
    setCurrentData(data);
  };
  useEffect(() => {
    loadData();
  }, []);
  return ce(Div, {
    className: styles.container,
    children: [
      cc(MediaContentFilter, {
        currentFilter: currentFilter,
        setCurrentFilter: setCurrentFilter,
      }),
      cc(MediaContentTabs, {
        tabs: currentData.map((data, idx) => {
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
        }),
      }),
    ],
  });
};
