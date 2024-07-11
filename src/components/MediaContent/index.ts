import { Div, Main, ce } from "@/libs";
import { ContentFilter } from "../ContentFilter/ContentFilter";
import { useEffect, useState } from "@/libs";
import { cc } from "@/libs";
import { getMediaIdByCategories } from "@/remotes/getMediaIdByCategories";
import { MediaIdByCategories } from "@/models/Newsstand";
import { MediaContentTabs } from "./MediaContentTabs";
import styles from "./index.module.css";
import { CategoryTabActiveBadge } from "./CategoryTabActiveBadge";
import { MediaContentMain } from "./MediaContentMain";
import { getSubscribedMedias } from "@/remotes/getSubscribedMedias";
import { MediaContentFilterType } from "@/models/MediaContentFilter";

export const MediaContent = () => {
  const [currentFilter, setCurrentFilter] =
    useState<MediaContentFilterType>("전체 언론사");

  const [currentData, setCurrentData] = useState<MediaIdByCategories | null>(
    null,
  );
  const loadData = async () => {
    if (currentFilter == "내가 구독한 언론사") {
      const data = await getSubscribedMedias();
      setCurrentData(data);
      return;
    }
    const data = await getMediaIdByCategories();
    setCurrentData(data);
  };
  useEffect(() => {
    loadData();
  }, [currentFilter]);

  if (currentData === null) {
    return null;
  }
  const [currentDataIdx, setCurrentDataIdx] = useState<[number, number]>([
    0, 0,
  ]);

  const hasNext =
    currentDataIdx[0] < currentData.length - 1 ||
    currentDataIdx[1] < currentData[currentDataIdx[0]].mediaIds.length - 1;
  const hasPrev = currentDataIdx[0] >= 1;

  const handleNext = () => {
    if (!hasNext) return;
    if (
      currentDataIdx[1] + 1 <
      currentData[currentDataIdx[0]].mediaIds.length
    ) {
      setCurrentDataIdx([currentDataIdx[0], currentDataIdx[1] + 1]);
      return;
    }
    setCurrentDataIdx([currentDataIdx[0] + 1, 0]);
  };

  const handlePrev = () => {
    if (currentDataIdx[1] - 1 >= 0) {
      setCurrentDataIdx([currentDataIdx[0], currentDataIdx[1] - 1]);
      return;
    }

    if (hasPrev) {
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
      cc(ContentFilter, {
        currentFilter: currentFilter,
        setCurrentFilter: setCurrentFilter,
      }),
      ce(Main, {
        children: [
          cc(MediaContentTabs, {
            tabs: tabData,
            hasNext: hasNext,
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
