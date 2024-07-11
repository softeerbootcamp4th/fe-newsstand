import { AppHeader } from "./components/AppHeader";
import { CurrentNews } from "./components/CurrentNews";
import { cc } from "./libs/nodes/components";
import { ce, Div } from "./libs/nodes/elements";
import styles from "./App.module.css";
import { ContentList } from "./components/ContentList";
import { ModalProvider } from "./providers/ModalProvider";
import { ToastProvider } from "./providers/ToastProvider";
export const App = () => {
  return cc(ToastProvider, {
    children: [
      cc(ModalProvider, {
        children: [
          ce(Div, {
            className: styles.container,
            children: [
              cc(AppHeader, {}),
              cc(CurrentNews, {}),
              cc(ContentList, {}),
            ],
          }),
        ],
      }),
    ],
  });
};
