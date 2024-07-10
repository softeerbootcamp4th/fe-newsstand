import {
  stateIdxMap,
  currentKey,
  statesMap,
  isRendering,
  updateQueue,
  render,
} from "../core";

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
  const state = states[stateIdx];
  const setState = (newState: T) => {
    if (isRendering) {
      updateQueue.pushBack(() => {
        states[stateIdx] = newState;
      });
    }
    states[stateIdx] = newState;
    render();
  };
  stateIdxMap.set(currentKey, stateIdx + 1);
  return [state, setState] as [T, (newState: T) => void];
};
