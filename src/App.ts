import { AppHeader } from "./components/AppHeader";
import { CurrentNews } from "./components/CurrentNews";
import { cc } from "./libs/nodes/components";
import { ce, Div } from "./libs/nodes/elements";
import styles from "./App.module.css";
import { MediaContent } from "./components/MediaContent";
import { ModalProvider } from "./providers/ModalProvider";
import { AppComponent } from "./libs";
export const App = () => {
  return cc(ModalProvider as AppComponent, {
    children: [
      ce(Div, {
        className: styles.container,
        children: [
          cc(AppHeader, {}),
          cc(CurrentNews, {}),
          cc(MediaContent, {}),
        ],
      }),
    ],
  });
};
