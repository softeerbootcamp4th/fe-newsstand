import { Button, Div, Raw, ce } from "@/libs";
import styles from "./MediaContent.module.css";
import { Category } from "@/models/Newsstand";
import { useMedia } from "@/hooks/useMedia";
import { cc } from "@/libs";
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
  return ce(Div, {
    className: styles.container,
    children: [
      ce(Button, {
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
        media,
      }),
      ce(Button, {
        className: `${styles.btn} ${styles.right}`,
        children: [Raw(RightIcon)],
        onClick: handleNext,
      }),
    ],
  });
};
