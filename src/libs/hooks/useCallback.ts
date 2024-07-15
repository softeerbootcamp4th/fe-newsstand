/* eslint-disable @typescript-eslint/no-explicit-any */
import { callbackIdxMap, currentKey, callbackDepsMap } from "../core";
import { isPropsEqual } from "../utils";

export const useCallback = <T extends (...args: any[]) => any>(
  callback: T,
  deps?: Array<unknown>[],
) => {
  const currentDeps = deps ?? null;

  if (!callbackIdxMap.has(currentKey)) {
    callbackIdxMap.set(currentKey, 0);
  }
  if (!callbackDepsMap.has(currentKey)) {
    callbackDepsMap.set(currentKey, []);
  }
  const callbackDeps = callbackDepsMap.get(currentKey)!;
  const callbackIdx = callbackIdxMap.get(currentKey)!;
  if (callbackDeps.length <= callbackIdx) {
    callbackDeps.push(null);
  }
  const prevDeps = callbackDeps[callbackIdx];
  if (currentDeps != null && isPropsEqual(prevDeps, currentDeps)) {
    callbackIdxMap.set(currentKey, callbackIdx + 1);
    return callback;
  }
  callbackDeps[callbackIdx] = currentDeps;

  callbackIdxMap.set(currentKey, callbackIdx + 1);
  return callback;
};
