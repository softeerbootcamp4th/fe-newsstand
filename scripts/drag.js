export function addDragEvent(state) {
    const draggableDom = document.querySelector('#draggable_wrapper');

    const positionPointer = {
        leftOffset: null,
        dragStartAbsoluteX: null,
        currentX: null
    }

    draggableDom.addEventListener('mousedown', (e) => {
        state.isDragging = true;
        positionPointer.leftOffset = draggableDom.scrollLeft;
        positionPointer.dragStartAbsoluteX = e.clientX;
    });

    draggableDom.addEventListener('mousemove', (e) => {
        if (state.isDragging) {
            positionPointer.currentX = positionPointer.leftOffset + positionPointer.dragStartAbsoluteX - e.clientX;
            draggableDom.scrollTo({ left: positionPointer.currentX, behavior: "auto" });
        }
    });

    draggableDom.addEventListener('mouseup', (e) => {
        state.isDragging = false;
        positionPointer.leftOffset = positionPointer.currentX;
    });

    draggableDom.addEventListener("mouseleave", (e) => {
        state.isDragging = false;
        positionPointer.leftOffset = positionPointer.currentX;
    });

}
