/**
 * 객체를 deep freeze 하는 함수
 * @param {*} target - 동결할 대상
 * @returns 동결한 객체
 */
export function deepFreeze(target) {
    if (target && typeof target === "object" && !Object.isFrozen(target)) {
        Object.freeze(target);
        Object.keys(target).forEach(key => deepFreeze(target[key]));
    }

    return target;
}