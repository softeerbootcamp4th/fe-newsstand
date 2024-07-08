import { Div, ce } from "@/libs/elements";
import { MediaContentFilter } from "./MediaContentFilter";
import { useState } from "@/libs";
import { cc } from "@/libs/components";

export type MediaContentFilterType = "전체 언론사" | "내가 구독한 언론사";

export const MediaContent = () => {
  const [currentFilter, setCurrentFilter] =
    useState<MediaContentFilterType>("전체 언론사");
  return ce(Div, {
    children: [
      cc(MediaContentFilter, {
        currentFilter: currentFilter,
        setCurrentFilter: setCurrentFilter,
      }),
    ],
  });
};
