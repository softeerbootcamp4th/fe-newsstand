import { AppChild, Div, cc, ce, useEffect, useState } from "@/libs";
import { createContext } from "@/libs/hooks/useContext";
import styles from "./ToastProvider.module.css";
import typoStyles from "@/styles/typo.module.css";
interface ToastContextValue {
  addToast: (toast: string) => void;
}
export const ToastContext = createContext<ToastContextValue | null>(null);

const ToastContainer = ({ toasts }: { toasts: string[] }) => {
  return ce(Div, {
    className: styles.container,
    children: [
      ...toasts.map((toast) =>
        ce(Div, {
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
  };

  useEffect(() => {
    console.log("add Interval");
    const interval = setInterval(() => {
      setCurrentToasts((prev) => {
        if (prev.length === 0) return prev;
        return prev.slice(1);
      });
    }, 5000);
    return () => {
      clearInterval(interval);
      console.log("remove Interval");
    };
  }, []);

  return ToastContext.Provider({
    value: {
      addToast,
    },
    children: [...children, cc(ToastContainer, { toasts: currentToasts })],
  });
};
