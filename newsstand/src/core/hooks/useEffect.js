/**
 *  useEffect는 의존성 배열에 존재하는 값이 변경되었을 때, 등록된 콜백을 실행해야 한다.
 * @param callback          // 콜백 함수
 * @param dependencies      // 의존성 배열
 * @param effectId          // useEffect의 아이디
 * @return
 */

import { currentComponent } from '../component/component.js'

const oldDependenciesMap = new Map()

const isDependenciesShouldChange = (obj1, obj2) => {
    let isSameDependencies = true
    let isShouldChange = false

    // 길이가 다르면 false
    if (obj1.length !== obj2.length) {
        return false
    }

    // 순서가 똑같아야 하므로 index 순회하면서 비교
    for (let index = 0; index < obj1.length; index++) {
        const element1 = obj1[index]
        const element2 = obj2[index]

        if (!element1 || !element2) {
            return false
        }

        if (element1.stateId != element2.stateId) {
            isSameDependencies = false
            break
        }

        if (element1.value != element2.value) {
            isShouldChange = true
        }
    }

    if (isSameDependencies && isShouldChange) {
        return true
    }
    return false
}

const useEffect = (callback, dependencies, effectId) => {
    const { id } = currentComponent

    const oldDependencyId = `${id}_${effectId}`
    let oldDependencies = null
    let shouldUpdate = true

    if (oldDependenciesMap.has(oldDependencyId)) {
        oldDependencies = oldDependenciesMap.get(oldDependencyId)
    }

    if (oldDependencies) {
        shouldUpdate = isDependenciesShouldChange(oldDependencies, dependencies)
    }

    if (shouldUpdate) {
        callback()
        oldDependenciesMap.set(oldDependencyId, dependencies)
    }
}

export default useEffect
