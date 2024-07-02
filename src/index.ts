import { AppHeader } from "./components/AppHeader";
import { Medias } from "./components/Medias";
import { TopSection } from "./components/TopSection";
import { Div } from "./libs/Elements";

export const App = () => {
  return Div({
    children: [AppHeader(), TopSection(), Medias()],
  });
};
