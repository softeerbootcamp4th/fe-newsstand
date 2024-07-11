import { ce, Div, Button, AppChild } from "@/libs";
import styles from "./Modal.module.css";
import typoStyles from "@/styles/typo.module.css";

interface ModalProps {
  onConfirm: () => void;
  onDismiss: () => void;
  confirmText?: string;
  dismissText?: string;
  content: AppChild;
}
export const Modal = ({
  onConfirm,
  onDismiss,
  confirmText = "확인",
  dismissText = "취소",
  content,
}: ModalProps) => {
  const buttonStyle = `${typoStyles["available-medium16"]} ${styles["btn"]}`;
  return ce(Div, {
    className: styles.modal,
    children: [
      ce(Div, {
        className: styles["modal-box"],
        children: [
          ce(Div, {
            className: styles["modal-content"],
            children: [content],
          }),
          ce(Div, {
            className: styles["btn-box"],
            children: [
              ce(Button, {
                className: buttonStyle,
                children: [confirmText],
                onClick: onConfirm,
              }),
              ce(Button, {
                className: buttonStyle,
                children: [dismissText],
                onClick: onDismiss,
              }),
            ],
          }),
        ],
      }),
    ],
  });
};
