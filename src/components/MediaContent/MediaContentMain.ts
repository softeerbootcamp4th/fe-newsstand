import { Div, ce } from "@/libs/elements";
import styles from "./MediaContentMain.module.css";
import { Category } from "@/models/Newsstand";
import { useMedia } from "@/hooks/useMedia";
import { cc } from "@/libs/components";
import { MediaContentMainHeader } from "./MediaContentMainHeader";

interface MediaContentMainProps {
  mediaId: number;
  category: Category;
}
export const MediaContentMain = ({
  mediaId,
  category,
}: MediaContentMainProps) => {
  const media = useMedia(mediaId);
  return ce(Div, {
    className: styles.container,
    children: [
      cc(MediaContentMainHeader, {
        media,
      }),
    ],
  });
};
