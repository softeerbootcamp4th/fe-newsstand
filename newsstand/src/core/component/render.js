import createComponent from './component.js'

const render = (component, props) => {
    const $component = document.getElementById(component.name + props.id)
    if (!$component) {
        return
    }

    const componentInstance = createComponent(component, props)

    $component.outerHTML = componentInstance.element
}

export default render
