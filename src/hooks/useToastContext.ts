import { useContext } from "@/libs/hooks/useContext";
import { ToastContext } from "@/providers/ToastProvider";

export const useToastContext = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToastContext must be used within a ToastProvider");
  }
  return context;
};
