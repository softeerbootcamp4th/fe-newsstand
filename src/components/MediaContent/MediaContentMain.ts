import { Button, Div, Raw, ce } from "@/libs/elements";
import styles from "./MediaContentMain.module.css";
import { Category } from "@/models/Newsstand";
import { useMedia } from "@/hooks/useMedia";
import { cc } from "@/libs/components";
import { MediaContentMainHeader } from "./MediaContentMainHeader";
import { useMediaRecentNews } from "@/hooks/useMediaRecentNews";
import { MediaContentView } from "./MediaContentView";
import { RightIcon } from "@/assets/RightIcon";
import { LeftIcon } from "@/assets/LeftIcon";

interface MediaContentMainProps {
  mediaId: number;
  category: Category;
  handleNext: () => void;
  handlePrev: () => void;
}
export const MediaContentMain = ({
  mediaId,
  category,
  handleNext,
  handlePrev,
}: MediaContentMainProps) => {
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
      cc(MediaContentMainHeader, {
        media,
        setMedia,
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
