import { Div, ce } from "../nodes/elements";
import { AppChild, CreatedAppElement } from "../nodes/renderer";

type Subscriber<T> = (value: T) => void;

export const createContext = <T>(defaultValue: T) => {
  let value = defaultValue;
  const subscribers = new Set<Subscriber<T>>();
  const Provider = ({
    children,
    value: newValue,
  }: {
    children: AppChild[];
    value: T;
  }): CreatedAppElement => {
    value = newValue;
    subscribers.forEach((cb) => cb(value));
    return ce(Div, {
      children,
    });
  };

  const Consumer = ({ children }: { children: (value: T) => AppChild[] }) => {
    const cb = () => children(value);
    subscribers.add(cb);
    return cb();
  };

  return {
    Provider,
    Consumer,
    subscribe: (subscriber: Subscriber<T>) => {
      subscribers.add(subscriber);
      return () => subscribers.delete(subscriber);
    },
    getValue: () => value,
  };
};

export const useContext = <T>(context: ReturnType<typeof createContext<T>>) => {
  let currentValue = context.getValue();
  const updateState = (newValue: T) => {
    currentValue = newValue;
  };

  context.subscribe(updateState);

  return currentValue;
};
