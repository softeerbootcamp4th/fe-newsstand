import { useState } from "./libs";
import { cc } from "./libs/components";
import { ce, div } from "./libs/elements";
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

export const App = () => {
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
