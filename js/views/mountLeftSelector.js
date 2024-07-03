import State from "../state.js";

function mountLeftSelector()
{
	const allMediaSelector = document.getElementById("allMediaSelector");
	const subMediaSelector = document.getElementById("subMediaSelector");

	const state = new State(1, (newState)=>{
		if(newState === 1) {
			allMediaSelector.classList.add("selected");
			subMediaSelector.classList.remove("selected");
		}
		else {
			allMediaSelector.classList.remove("selected");
			subMediaSelector.classList.add("selected");
		}
	});

	allMediaSelector.addEventListener("click", ()=>{
		state.change(1);
	});
	subMediaSelector.addEventListener("click", ()=>{
		state.change(2);
	});

	return state;
}

export default mountLeftSelector;