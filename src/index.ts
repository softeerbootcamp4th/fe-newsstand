import { AppHeader } from "./components/AppHeader";
import { TopSection } from "./components/TopSection";

export const App = () => {
  return `
    <div>
      ${AppHeader()}
      ${TopSection()}
    </div>
  `;
};
