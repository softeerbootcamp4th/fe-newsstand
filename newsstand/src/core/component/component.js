export let currentComponent = null;

const bindEventsAfterRender = (componentInstance, componentId) => {
	requestAnimationFrame(() => {
		if (!document.getElementById(componentId) || !componentInstance.bindEvents) return;

		componentInstance.bindEvents();
	});
};

const createComponent = (component, props) => {
	const previousComponent = currentComponent;

	currentComponent = { id: component.name, stateIndex: 0, component, props };

	if (props){
		currentComponent.id += props.id
	}

	const componentInstance = component(props);

	const namedComponent = `
	<div 
	  style="${props ? props.style : ''}" 
	  id="${currentComponent.id}">
	  ${componentInstance.element}
	</div>`;
	
	componentInstance.element = namedComponent;

	bindEventsAfterRender(componentInstance, currentComponent.id);

	currentComponent = previousComponent;
  
  	return componentInstance;
}

export default createComponent;