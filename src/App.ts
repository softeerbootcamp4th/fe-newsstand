import { AppHeader } from "./components/AppHeader";
import { CurrentNews } from "./components/CurrentNews";
import { cc } from "./libs/components";
import { ce, Div } from "./libs/elements";
import styles from "./App.module.css";
import { MediaContent } from "./components/MediaContent";
export const App = () => {
  return ce(Div, {
    className: styles.container,
    children: [cc(AppHeader, {}), cc(CurrentNews, {}), cc(MediaContent, {})],
  });
};
