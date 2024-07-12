import { AppHeader } from "./components/AppHeader";
import { CurrentNews } from "./components/CurrentNews";
import { Div } from "./libs/nodes/elements";
import styles from "./App.module.css";
import { ContentList } from "./components/ContentList";
import { ModalProvider } from "./providers/ModalProvider";
import { ToastProvider } from "./providers/ToastProvider";
import { cc } from "./libs";
export const App = () => {
  return cc(ToastProvider, {
    children: [
      cc(ModalProvider, {
        children: [
          cc(Div, {
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
