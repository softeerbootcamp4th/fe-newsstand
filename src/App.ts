import { AppHeader } from "./components/AppHeader";
import { useState } from "./libs";
import { cc } from "./libs/components";
import { ce, Div } from "./libs/elements";
import { AppComponent } from "./libs/renderer";

interface TestProps {
  text: string;
}
const Test: AppComponent<TestProps> = ({ text }: TestProps) => {
  const [state, setState] = useState(0);
  const onClick = () => {
    setState(state + 1);
  };
  return ce(Div, {
    children: [text, state],
    onClick,
  });
};

export const App = () => {
  return ce(Div, {
    className: "container",
    children: ["hi", cc(AppHeader, {})],
  });
};
