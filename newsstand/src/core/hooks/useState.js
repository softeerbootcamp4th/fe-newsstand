import { currentComponent } from '../component/component.js'
import render from '../component/render.js'
import { deepEqual } from '../../utils/deepEqual.js'

export const componentsState = new Map()

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

        const shouldUpdate = deepEqual(currentState, updatedState)

        if (!shouldUpdate) {
            componentsState.set(uniqueId, newValue)

            render(component, componentProps)
        }
    }

    return [state, setState]
}

export default useState
