import { Button, Div, Img, Raw, Span, ce } from "@/libs";
import styles from "./MediaContentMainHeader.module.css";
import typoStyles from "@/styles/typo.module.css";
import { cc } from "@/libs";
import { formatDetailDate } from "@/utils/formatDate";
import { PlucIcon } from "@/assets/PlucIocn";
import { Media } from "@/models/Media";
import { CloseIcon } from "@/assets/CloseIcon";
import { updateMediaSubscribe } from "@/remotes/updateMediaSubscibe";

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

interface SubscribeButtonProps {
  isSubscribed: boolean;
  onClick: () => void;
}
const SubscribeButton = ({ isSubscribed, onClick }: SubscribeButtonProps) => {
  if (isSubscribed) {
    return ce(Button, {
      className: `${typoStyles["available-medium12"]} ${styles["subscribe-button"]}`,
      children: [Raw(PlucIcon), "구독하기"],
      onClick: onClick,
    });
  }
  return ce(Button, {
    className: `${typoStyles["available-medium12"]} ${styles["subscribe-button"]}`,
    children: [Raw(CloseIcon)],
    onClick: onClick,
  });
};

interface MediaContentMainHeaderProps {
  media: Media | null;
  setMedia: (media: Media) => void;
}
export const MediaContentMainHeader = ({
  media,
  setMedia,
}: MediaContentMainHeaderProps) => {
  if (media === null) {
    return null;
  }
  const isSubscribed = media.isSubscribed;
  return ce(Div, {
    className: styles.header,
    children: [
      cc(Logo, {
        src: media?.imgSrc,
      }),
      cc(LastEditedDate, {
        date: media?.lastEdited,
      }),
      cc(SubscribeButton, {
        isSubscribed: isSubscribed,
        onClick: () => {
          if (media === null) {
            return;
          }
          updateMediaSubscribe(media.id, !isSubscribed);
          setMedia({ ...media, isSubscribed: !isSubscribed });
        },
      }),
    ],
  });
};
