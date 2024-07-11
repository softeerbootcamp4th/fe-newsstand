import { Div, ce } from "@/libs";
import { ContentFilter } from "../ContentFilter/ContentFilter";
import { useState } from "@/libs";
import { cc } from "@/libs";
import styles from "./index.module.css";
import { MediaContentFilterType } from "@/models/MediaContentFilter";
import { AllcontentList } from "./AllcontentList";
import { SubscribedContentList } from "./SubscribedContentList";

export const ContentList = () => {
  const [currentFilter, setCurrentFilter] =
    useState<MediaContentFilterType>("전체 언론사");

  return ce(Div, {
    className: styles.container,
    children: [
      cc(ContentFilter, {
        currentFilter: currentFilter,
        setCurrentFilter: setCurrentFilter,
      }),
      currentFilter === "전체 언론사"
        ? cc(AllcontentList, {
            setCurrentFilter,
          })
        : cc(SubscribedContentList, {
            setCurrentFilter,
          }),
    ],
  });
};
