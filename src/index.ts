import { AppHeader } from "./components/AppHeader";
import { Medias } from "./components/Medias";
import { Div } from "./libs/Elements";
import styles from "./index.module.css";
export const App = () => {
  return Div({
    className: styles.container,
    children: [AppHeader(), Medias()],
  });
};
