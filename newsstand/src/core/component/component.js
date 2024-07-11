export let currentComponent = null

let prevRemoveEventsMap = new Map()

const bindEventsAfterRender = (componentInstance, componentId) => {
    requestAnimationFrame(() => {
        if (!document.getElementById(componentId) || !componentInstance.bindEvents) return

        // 이전 이벤트 리스너 제거
        if (prevRemoveEventsMap.has(componentId)) {
            const prevRemoveEvents = prevRemoveEventsMap.get(componentId)
            if (prevRemoveEvents) {
                prevRemoveEvents()
            }
        }

        // 새로운 이벤트 리스너 등록
        componentInstance.bindEvents()

        // 현재 컴포넌트의 removeEvents를 map에 저장
        prevRemoveEventsMap.set(componentId, componentInstance.removeEvents)
    })
}

const createComponent = (component, props) => {
    const previousComponent = currentComponent

    currentComponent = { id: component.name, component: component, componentProps: props }

    if (props) {
        currentComponent.id += props.id
    }

    const componentInstance = component(props)

    const namedComponent = `
	<div 
	  style="${props ? props.style : ''}" 
	  id="${currentComponent.id}">
	  ${componentInstance.element}
	</div>`

    componentInstance.element = namedComponent

    bindEventsAfterRender(componentInstance, currentComponent.id)

    currentComponent = previousComponent

    return componentInstance
}

export default createComponent
