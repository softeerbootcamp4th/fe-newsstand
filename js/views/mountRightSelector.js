import State from "../state.js";

function mountRightSelector()
{
	const listSelector = document.getElementById("listSelector");
	const gridSelector = document.getElementById("gridSelector");

	const state = new State(1, (newState)=>{
		if(newState === 1) {
			listSelector.classList.add("selected");
			gridSelector.classList.remove("selected");
		}
		else {
			listSelector.classList.remove("selected");
			gridSelector.classList.add("selected");
		}
	});

	listSelector.addEventListener("click", ()=>{
		state.change(1);
	});
	gridSelector.addEventListener("click", ()=>{
		state.change(2);
	});

	return state;
}

export default mountRightSelector;