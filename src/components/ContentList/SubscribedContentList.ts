import { useState, useEffect, cc, ce, Main, Raw } from "@/libs";
import { MediaIdByCategories } from "@/models/Newsstand";
import { MediaContent } from "../MediaContent/MediaContent";
import { MediaContentTabs } from "./ContentListHeader";
import { getSubscribedMedias } from "@/remotes/getSubscribedMedias";
import { RightSmallIcon } from "@/assets/RightSmallIcon";
import { MediaContentFilterType } from "@/models/MediaContentFilter";

interface SubscribedContentListProps {
  setCurrentFilter: (filter: MediaContentFilterType) => void;
}
export const SubscribedContentList = ({
  setCurrentFilter,
}: SubscribedContentListProps) => {
  const [currentData, setCurrentData] = useState<MediaIdByCategories | null>(
    null,
  );
  const loadData = async () => {
    const data = await getSubscribedMedias();
    setCurrentData(data);
  };
  useEffect(() => {
    loadData();
  }, []);

  if (currentData === null || currentData.length === 0) {
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
      sub: isActive ? Raw(RightSmallIcon) : null,
      isActive: isActive,
      onClick: () => {
        handleClick([idx, 0]);
      },
      onNext: handleNext,
    };
  });

  const handleUnsubscribe = () => {
    setCurrentFilter("전체 언론사");
    loadData();
  };

  return ce(Main, {
    children: [
      cc(MediaContentTabs, {
        tabs: tabData,
        hasNext: hasNext,
      }),
      cc(MediaContent, {
        mediaId: currentMediaId,
        category: currentCategory,
        handleNext: handleNext,
        handlePrev,
        handleUnsubscribe,
      }),
    ],
  });
};
