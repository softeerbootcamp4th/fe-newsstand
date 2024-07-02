import { currentComponent } from '../component/component.js';
import render from '../component/render.js';

const componentsState = {};

const useState = (initialValue) => {
	const { id, stateIndex, component, props } = currentComponent;

  console.log("----")
  console.log(id)
  console.log(stateIndex)
  console.log(props)


  if(!componentsState[id]){
    componentsState[id] = [];
  }

  if (componentsState[id][stateIndex] === undefined){
    componentsState[id][stateIndex] = initialValue;
  }

  const state = componentsState[id][stateIndex];

	const setState = (newValue) => {
    const currentState = componentsState[id][stateIndex];

    const updatedState = typeof newValue === 'function' ? newValue(currentState) : newValue; 

    if (currentState !== updatedState){
      componentsState[id][stateIndex] = updatedState; 
      
      render(component, props);
    }

  };
  
  return [state, setState];
}

export default useState;