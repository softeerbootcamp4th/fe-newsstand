function mountPageMoverSelector(state, reducers)
{
	const leftMover = document.getElementById("leftMoveButton");
	const rightMover = document.getElementById("rightMoveButton");

	state.addSideEffect( (value)=>{
		leftMover.classList.toggle("hidden", reducers.isFirstPage());
		rightMover.classList.toggle("hidden", reducers.isLastPage());
	} );

	leftMover.addEventListener("click", ()=>reducers.moveLeft());
	rightMover.addEventListener("click", ()=>reducers.moveRight());
}

export default mountPageMoverSelector;