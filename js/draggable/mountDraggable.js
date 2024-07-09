function mountDraggable(el)
{
	let isDragging = false;
	let startOffset = 0;
	let scrollLeftBase = 0;
	function onDragStart(e)
	{
		isDragging = true;
		startOffset = e.pageX;
		scrollLeftBase = this.scrollLeft;
	}
	function onDragging(e)
	{
		if(!isDragging) return;
		this.scrollLeft = scrollLeftBase - e.pageX + startOffset;
	}
	function onDragEnd(e)
	{
		isDragging = false;
		startOffset = 0;
		scrollLeftBase = 0;
	}

	el.addEventListener("pointerdown", onDragStart);
	el.addEventListener("pointermove", onDragging);
	el.addEventListener("pointerup", onDragEnd);
	el.addEventListener("pointercancel", onDragEnd);
	el.addEventListener("pointerleave", onDragEnd);
}