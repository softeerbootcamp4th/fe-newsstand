import { Button, Div, Raw, cc } from "@/libs";
import styles from "./MediaContent.module.css";
import { Category } from "@/models/Newsstand";
import { useMedia } from "@/hooks/useMedia";

import { MediaContentHeader } from "./MediaContentHeader";
import { useMediaRecentNews } from "@/hooks/useMediaRecentNews";
import { MediaContentView } from "./MediaContentView";
import { RightIcon } from "@/assets/RightIcon";
import { LeftIcon } from "@/assets/LeftIcon";
import { Media } from "@/models/Media";

interface MediaContentProps {
  mediaId: number;
  category: Category;
  handleNext: () => void;
  handlePrev: () => void;
  handleUnsubscribe?: () => void;
  handleSubscribe?: (media: Media) => void;
}
export const MediaContent = ({
  mediaId,
  category,
  handleNext,
  handlePrev,
  handleUnsubscribe,
  handleSubscribe,
}: MediaContentProps) => {
  const [media, setMedia] = useMedia(mediaId);
  const newsList = useMediaRecentNews(mediaId, category.id);
  return cc(Div, {
    className: styles.container,
    children: [
      cc(Button, {
        className: `${styles.btn} ${styles.left}`,
        children: [Raw(LeftIcon)],
        onClick: handlePrev,
      }),
      cc(MediaContentHeader, {
        media,
        setMedia,
        handleUnsubscribe,
        handleSubscribe,
      }),
      cc(MediaContentView, {
        newsList: newsList,
        media: media,
      }),
      cc(Button, {
        className: `${styles.btn} ${styles.right}`,
        children: [Raw(RightIcon)],
        onClick: handleNext,
      }),
    ],
  });
};
