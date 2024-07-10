import { useContext } from "@/libs/hooks/useContext";
import { ModalContext } from "@/providers/ModalProvider";

export const useModalContext = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModalContext must be used within a ModalProvider");
  }
  return context;
};
