import { AppHeader } from "./components/AppHeader";
import { Medias } from "./components/Medias/Medias";
import { Div } from "./libs/Elements";
import styles from "./App.module.css";
export const App = () => {
  return Div({
    className: styles.container,
    children: [AppHeader(), Medias()],
  });
};
