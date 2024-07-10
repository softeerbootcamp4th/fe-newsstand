import { currentComponent } from '../component/component.js'
import render from '../component/render.js'
import { deepEqual } from '../../utils/deepEqual.js'

export const componentsState = new Map()

const debounce = (func, wait) => {
    let timeout
    return (...args) => {
        const later = () => {
            clearTimeout(timeout)
            func(...args)
        }
        clearTimeout(timeout)
        timeout = setTimeout(later, wait)
    }
}

const useState = ({ stateId, initialValue }) => {
    const { id, component, componentProps } = currentComponent
    const uniqueId = `${id}_${stateId}`

    if (!componentsState.has(uniqueId)) {
        componentsState.set(uniqueId, initialValue)
    }

    const state = componentsState.get(uniqueId)

    const setState = (newValue) => {
        const currentState = state
        const updatedState = typeof newValue === 'function' ? newValue(currentState) : newValue

        const shouldUpdate = !deepEqual(currentState, updatedState)

        if (shouldUpdate) {
            componentsState.set(uniqueId, updatedState)
            render(component, componentProps)
        }
    }

    const debouncedSetState = debounce(setState, 10)

    return [{ stateId: stateId, value: state }, debouncedSetState]
}

export default useState
