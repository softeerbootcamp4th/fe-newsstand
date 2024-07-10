function mountLeftSelector(state, setFullView, setSubscribedView)
{
	const allMediaSelector = document.getElementById("allMediaSelector");
	const subMediaSelector = document.getElementById("subMediaSelector");

	state.addSideEffect( (newState)=>{
		if(!newState) {
			allMediaSelector.classList.add("selected");
			subMediaSelector.classList.remove("selected");
		}
		else {
			allMediaSelector.classList.remove("selected");
			subMediaSelector.classList.add("selected");
		}
	} );

	allMediaSelector.addEventListener("click", setFullView);
	subMediaSelector.addEventListener("click", setSubscribedView);
}

export default mountLeftSelector;