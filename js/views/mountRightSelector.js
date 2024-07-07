function mountRightSelector(state, setListView, setGridView)
{
	const listSelector = document.getElementById("listSelector");
	const gridSelector = document.getElementById("gridSelector");

	state.addSideEffect( (newState)=>{
		if(newState === "list") {
			listSelector.classList.add("selected");
			gridSelector.classList.remove("selected");
		}
		else {
			listSelector.classList.remove("selected");
			gridSelector.classList.add("selected");
		}
	} );

	listSelector.addEventListener("click", setListView);
	gridSelector.addEventListener("click", setGridView);
}

export default mountRightSelector;