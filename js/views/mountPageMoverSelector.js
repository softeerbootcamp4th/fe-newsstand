function mountPageMoverSelector(state, {moveLeft, moveRight})
{
	const leftMover = document.getElementById("leftMoveButton");
	const rightMover = document.getElementById("rightMoveButton");

	state.isFirstPage.addSideEffect( (value)=>{
		leftMover.classList.toggle("hidden", value);
	} );
	state.isLastPage.addSideEffect( (value)=>{
		rightMover.classList.toggle("hidden", value);
	} );

	leftMover.addEventListener("click", ()=>moveLeft());
	rightMover.addEventListener("click", ()=>moveRight());
}

export default mountPageMoverSelector;