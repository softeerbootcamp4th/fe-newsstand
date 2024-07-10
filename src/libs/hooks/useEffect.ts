import {
  effectIdxMap,
  currentKey,
  effectCleanupsMap,
  effectDepsMap,
} from "../core";
import { isPropsEqual } from "../utils";

export const useEffect = (
  effect: () => void | (() => void),
  deps?: Array<unknown>,
) => {
  const currentDeps = deps ?? null;

  if (!effectIdxMap.has(currentKey)) {
    effectIdxMap.set(currentKey, 0);
  }
  if (!effectCleanupsMap.has(currentKey)) {
    effectCleanupsMap.set(currentKey, []);
  }
  if (!effectDepsMap.has(currentKey)) {
    effectDepsMap.set(currentKey, []);
  }
  const effectDeps = effectDepsMap.get(currentKey)!;
  const effectsCleanups = effectCleanupsMap.get(currentKey)!;
  const effectIdx = effectIdxMap.get(currentKey)!;
  if (effectDeps.length <= effectIdx) {
    effectDeps.push(null);
  }
  const prevDeps = effectDeps[effectIdx];
  if (currentDeps != null && isPropsEqual(prevDeps, currentDeps)) {
    effectIdxMap.set(currentKey, effectIdx + 1);
    return;
  }
  effectDeps[effectIdx] = currentDeps;
  const cleanup = effect();

  if (effectIdx >= effectsCleanups.length) {
    if (cleanup != null) {
      effectsCleanups.push(cleanup);
    }
  } else {
    effectsCleanups[effectIdx]?.();
    if (cleanup != null) {
      effectsCleanups[effectIdx] = cleanup;
    }
  }

  effectIdxMap.set(currentKey, effectIdx + 1);
};
