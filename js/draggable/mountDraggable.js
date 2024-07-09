const DRAG_THRESHOLD = 10;

function mountDraggable(el)
{
	let isMouseHolding = false;
	let isDragged = false;
	let startOffset = 0;
	let scrollLeftBase = 0;
	function onDragStart(e)
	{
		isMouseHolding = true;
		startOffset = e.pageX;
		scrollLeftBase = this.scrollLeft;
	}
	function onDragging(e)
	{
		if(!isMouseHolding) return;
		if(!isDragged && Math.abs(e.pageX - startOffset) > DRAG_THRESHOLD ) isDragged = true;
		if(isDragged) this.scrollLeft = scrollLeftBase - e.pageX + startOffset;
	}
	function onDragEnd(e)
	{
		isMouseHolding = false;
		startOffset = 0;
		scrollLeftBase = 0;
	}
	function onDragClear(e)
	{
		isMouseHolding = false;
		startOffset = 0;
		scrollLeftBase = 0;
		isDragged = false;
	}
	function preventClick(e)
	{
		if(isDragged) {
			e.stopPropagation();
			e.stopImmediatePropagation();
		}
	}

	el.addEventListener("pointerdown", onDragStart);
	el.addEventListener("pointermove", onDragging);
	el.addEventListener("pointerup", onDragEnd);
	el.addEventListener("pointercancel", onDragEnd);
	el.addEventListener("pointerleave", onDragEnd);
	el.addEventListener("click", preventClick, true);
}

export default mountDraggable;