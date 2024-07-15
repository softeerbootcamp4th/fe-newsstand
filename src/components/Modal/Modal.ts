import { cc, Div, Button, AppChild } from "@/libs";
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
  return cc(Div, {
    className: styles.modal,
    children: [
      cc(Div, {
        className: styles["modal-box"],
        children: [
          cc(Div, {
            className: styles["modal-content"],
            children: [content],
          }),
          cc(Div, {
            className: styles["btn-box"],
            children: [
              cc(Button, {
                className: buttonStyle,
                children: [confirmText],
                onClick: onConfirm,
              }),
              cc(Button, {
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
