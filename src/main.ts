import { useState, init } from "./libs";
import { ce, div } from "./libs/Elements";
import { cc } from "./libs/components";

import { AppComponent } from "./libs/renderer";

interface TestProps {
  text: string;
}
const Test: AppComponent<TestProps> = ({ text }: TestProps) => {
  const [state, setState] = useState(0);
  const onClick = () => {
    setState(state + 1);
  };
  return ce(div, {
    children: [text, state],
    onClick,
  });
};

const App = () => {
  return ce(div, {
    className: "container",
    children: [
      "hi",
      cc(Test, {
        text: "test",
      }),
    ],
  });
};
const root = document.getElementById("app")!;

init(App, root);
