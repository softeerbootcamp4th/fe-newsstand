import { Button, Div, Img, Raw, Span, ce } from "@/libs/elements";
import styles from "./MediaContentMainHeader.module.css";
import typoStyles from "@/styles/typo.module.css";
import { cc } from "@/libs/components";
import { formatDetailDate } from "@/utils/formatDate";
import { PlucIcon } from "@/assets/PlucIocn";
import { Media } from "@/models/Media";

const Logo = ({ src }: { src?: string }) => {
  return ce(Span, {
    children: [
      ce(Img, {
        src,
        className: styles.logo,
      }),
    ],
  });
};

const LastEditedDate = ({ date }: { date?: string }) => {
  return ce(Span, {
    className: `${typoStyles["display-medium12"]} ${styles.date}`,
    children: [formatDetailDate(new Date(date ?? 0))],
  });
};

const subscribeButton = () => {
  return ce(Button, {
    className: `${typoStyles["available-medium12"]} ${styles["subscribe-button"]}`,
    children: [Raw(PlucIcon), "구독하기"],
  });
};

interface MediaContentMainHeaderProps {
  media: Media | null;
}
export const MediaContentMainHeader = ({
  media,
}: MediaContentMainHeaderProps) => {
  return ce(Div, {
    className: styles.header,
    children: [
      cc(Logo, {
        src: media?.imgSrc,
      }),
      cc(LastEditedDate, {
        date: media?.lastEdited,
      }),
      cc(subscribeButton, {}),
    ],
  });
};
