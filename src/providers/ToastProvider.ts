import { AppChild, Div, cc, useState } from "@/libs";
import { createContext } from "@/libs/hooks/useContext";
import styles from "./ToastProvider.module.css";
import typoStyles from "@/styles/typo.module.css";
interface ToastContextValue {
  addToast: (toast: string) => void;
}
export const ToastContext = createContext<ToastContextValue | null>(null);

const ToastContainer = ({ toasts }: { toasts: string[] }) => {
  return cc(Div, {
    className: styles.container,
    children: [
      ...toasts.map((toast) =>
        cc(Div, {
          className: `${styles.toast} ${typoStyles["display-medium16"]}`,
          children: [toast],
        }),
      ),
    ],
  });
};

export const ToastProvider = ({ children }: { children: AppChild[] }) => {
  const [currentToasts, setCurrentToasts] = useState<string[]>([]);
  const addToast = (toast: string) => {
    setCurrentToasts([...currentToasts, toast]);
    setTimeout(() => {
      setCurrentToasts((prev) => prev.slice(1));
    }, 5000);
  };

  return cc(ToastContext.Provider, {
    value: {
      addToast,
    },
    children: [...children, cc(ToastContainer, { toasts: currentToasts })],
  });
};
