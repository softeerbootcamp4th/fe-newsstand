import {
  stateIdxMap,
  currentKey,
  statesMap,
  isRendering,
  updateQueue,
  render,
} from "../core";
import { useCallback } from "./useCallback";

type Updater<T> = ((prev: T) => T) | T;
export const useState = <T>(initialState: T) => {
  if (!stateIdxMap.has(currentKey)) {
    stateIdxMap.set(currentKey, 0);
  }
  if (!statesMap.has(currentKey)) {
    statesMap.set(currentKey, []);
  }
  const stateIdx = stateIdxMap.get(currentKey)!;
  const states = statesMap.get(currentKey)!;
  if (stateIdx >= states.length) {
    states.push(initialState);
  }
  const setState = useCallback((updater: Updater<T>) => {
    const newState =
      typeof updater === "function"
        ? (updater as (prev: T) => T)(states[stateIdx] as T)
        : updater;
    if (isRendering) {
      updateQueue.pushBack(() => {
        states[stateIdx] = newState;
      });
    }
    states[stateIdx] = newState;
    render();
  }, []);
  stateIdxMap.set(currentKey, stateIdx + 1);
  return [states[stateIdx], setState] as [T, (updater: Updater<T>) => void];
};
