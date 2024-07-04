import { Media } from "@/models/Media";
import styles from "./MediaContentHeader.module.css";
import { Button, Div, Img, Span } from "@/libs/Elements";
import typoStyles from "@/styles/typo.module.css";
import { PlusIcon } from "./PlusIcon";
import { formatDetailDate } from "@/utils/formatDate";
interface MediaContentHeaderProps {
  media: Media;
}
export const MediaContentHeader = ({ media }: MediaContentHeaderProps) => {
  return Div({
    className: `${styles.container}`,
    children: [
      Img({
        src: media.imgSrc,
        alt: media.name,
        className: `${styles.logo}`,
      }),
      Span({
        children: [formatDetailDate(new Date()), " 편집"],
        className: `${styles["last-updated"]} ${typoStyles["display-medium12"]}`,
      }),
      Button({
        children: [PlusIcon(), "구독하기"],
        className: `${styles["follow-button"]} ${typoStyles["available-medium12"]}`,
      }),
    ],
  });
};
