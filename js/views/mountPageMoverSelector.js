function mountPageMoverSelector(state, reducers)
{
	const leftMover = document.getElementById("leftMoveButton");
	const rightMover = document.getElementById("rightMoveButton");

	state.isFirstPage.addSideEffect( (value)=>{
		leftMover.classList.toggle("hidden", value);
	} );
	state.isLastPage.addSideEffect( (value)=>{
		rightMover.classList.toggle("hidden", value);
	} );

	leftMover.addEventListener("click", ()=>reducers.moveLeft());
	rightMover.addEventListener("click", ()=>reducers.moveRight());
}

export default mountPageMoverSelector;