import { AppChild, Div, cc, ce, useState } from "@/libs";
import { createContext } from "@/libs/hooks/useContext";

interface ModalContextValue {
  addModal: (modal: AppChild) => void;
  closeModal: () => void;
}

export const ModalContext = createContext<ModalContextValue | null>(null);

export const ModalProvider = ({ children }: { children: AppChild[] }) => {
  const [currentModals, setCurrentModals] = useState<AppChild[]>([]);

  const addModal = (modal: AppChild) => {
    setCurrentModals([...currentModals, modal]);
  };

  const closeModal = () => {
    setCurrentModals(currentModals.slice(0, -1));
  };

  return cc(ModalContext.Provider, {
    value: {
      addModal,
      closeModal,
    } as ModalContextValue,
    children: [
      ...children,
      ce(Div, {
        children: currentModals,
      }),
    ],
  });
};
