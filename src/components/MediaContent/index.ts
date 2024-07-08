import { Div, Span, ce } from "@/libs/elements";
import { MediaContentFilter } from "./MediaContentFilter";
import { useEffect, useState } from "@/libs";
import { cc } from "@/libs/components";
import { getMediaIdByCategories } from "@/remotes/getMediaIdByCategories";
import { MediaIdByCategories } from "@/models/Newsstand";
import { MediaContentTabs } from "./MediaContentTabs";

export type MediaContentFilterType = "전체 언론사" | "내가 구독한 언론사";

export const MediaContent = () => {
  const [currentFilter, setCurrentFilter] =
    useState<MediaContentFilterType>("전체 언론사");

  const [currentData, setCurrentData] = useState<MediaIdByCategories>([]);
  const [currentDataIdx, setCurrentDataIdx] = useState<[number, number]>([
    0, 0,
  ]);

  const handleNext = () => {
    setCurrentDataIdx(
      currentDataIdx[0] + 1 < currentData.length
        ? [currentDataIdx[0] + 1, 0]
        : [0, 0],
    );
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
    children: [
      cc(MediaContentFilter, {
        currentFilter: currentFilter,
        setCurrentFilter: setCurrentFilter,
      }),
      cc(MediaContentTabs, {
        tabs: currentData.map((data, idx) => {
          return {
            main: data.category.name,
            sub: ce(Span, {
              children: [`${data.mediaIds.length}`],
            }),
            isActive: idx === currentDataIdx[0],
            onClick: () => {
              console.log(idx, "click");
              handleClick([idx, 0]);
            },
          };
        }),
      }),
    ],
  });
};
