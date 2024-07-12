import { Div, cc, useEffect } from "@/libs";
import { ContentFilter } from "../ContentFilter/ContentFilter";
import { useState } from "@/libs";

import styles from "./index.module.css";
import { MediaContentFilterType } from "@/models/MediaContentFilter";
import { AllcontentList } from "./AllcontentList";
import { SubscribedContentList } from "./SubscribedContentList";

export const ContentList = () => {
  const [currentFilter, setCurrentFilter] =
    useState<MediaContentFilterType>("전체 언론사");
  const [mediaName, setMediaName] = useState<string | null>(null);
  useEffect(() => {
    if (currentFilter === "전체 언론사") {
      setMediaName(null);
    }
  }, [currentFilter]);
  return cc(Div, {
    className: styles.container,
    children: [
      cc(ContentFilter, {
        currentFilter: currentFilter,
        setCurrentFilter: setCurrentFilter,
      }),
      currentFilter === "전체 언론사"
        ? cc(AllcontentList, {
            setCurrentFilter,
            setMediaName,
          })
        : cc(SubscribedContentList, {
            setCurrentFilter,
            mediaName,
          }),
    ],
  });
};
