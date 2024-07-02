import { AppHeader } from "./components/AppHeader";
import { Medias } from "./components/Medias";
import { Div } from "./libs/Elements";
import "./index.css";
export const App = () => {
  return Div({
    children: [AppHeader(), Medias()],
  });
};
