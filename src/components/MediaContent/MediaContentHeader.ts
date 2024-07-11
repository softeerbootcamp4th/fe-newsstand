import { Button, Div, Img, Raw, Span, ce } from "@/libs";
import styles from "./MediaContentHeader.module.css";
import typoStyles from "@/styles/typo.module.css";
import { cc } from "@/libs";
import { formatDetailDate } from "@/utils/formatDate";
import { PlucIcon } from "@/assets/PlucIocn";
import { Media } from "@/models/Media";
import { CloseIcon } from "@/assets/CloseIcon";
import { updateMediaSubscribe } from "@/remotes/updateMediaSubscibe";
import { useModalContext } from "@/hooks/useModalContext";
import { Modal } from "../Modal/Modal";
import { useToastContext } from "@/hooks/useToastContext";

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
  media: Media;
}
const SubscribeButton = ({
  isSubscribed,
  onClick,
  media,
}: SubscribeButtonProps) => {
  const { addModal, closeModal } = useModalContext();

  const onConfirm = () => {
    closeModal();
    onClick();
  };

  const onDismiss = () => {
    closeModal();
  };
  const openModal = () => {
    addModal(
      cc(Modal, {
        onConfirm: onConfirm,
        onDismiss: onDismiss,
        confirmText: "예, 해지합니다",
        dismissText: "아니오",
        content: ce(Div, {
          className: `${styles["subscibe-content"]} ${typoStyles["display-medium16"]}`,
          children: [
            ce(Span, {
              children: [
                ce(Span, {
                  className: typoStyles["display-bold16"],
                  children: [media.name],
                }),
                "을(를)",
              ],
            }),
            "구독해지하시겠습니까?",
          ],
        }),
      }),
    );
  };
  if (!isSubscribed) {
    return ce(Button, {
      className: `${typoStyles["available-medium12"]} ${styles["subscribe-button"]}`,
      children: [Raw(PlucIcon), "구독하기"],
      onClick: onClick,
    });
  }
  return ce(Button, {
    className: `${typoStyles["available-medium12"]} ${styles["subscribe-button"]}`,
    children: [Raw(CloseIcon)],
    onClick: openModal,
  });
};

interface MediaContentHeaderProps {
  media: Media | null;
  setMedia: (media: Media) => void;
  handleUnsubscribe?: () => void;
  handleSubscribe?: () => void;
}
export const MediaContentHeader = ({
  media,
  setMedia,
  handleUnsubscribe,
  handleSubscribe,
}: MediaContentHeaderProps) => {
  const { addToast } = useToastContext();
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
        media: media,
        onClick: async () => {
          if (media === null) {
            return;
          }
          const nextIsSubscribed = !isSubscribed;
          await updateMediaSubscribe(media.id, nextIsSubscribed);
          if (nextIsSubscribed) {
            addToast("내가 구독한 언론사에 추가되었습니다.");
            handleSubscribe?.();
          } else {
            handleUnsubscribe?.();
          }
          setMedia({ ...media, isSubscribed: nextIsSubscribed });
        },
      }),
    ],
  });
};
