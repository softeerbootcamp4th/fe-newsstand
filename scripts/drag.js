import state from "./store.js";

export function addDragEvent() {
    const draggableDom = document.querySelector('#draggable_wrapper');

    const positionPointer = {
        leftOffset: null,
        dragStartAbsoluteX: null,
        currentX: null
    }

    draggableDom.addEventListener('mousedown', (e) => {
        state.setter.setIsDragging(true);
        positionPointer.leftOffset = draggableDom.scrollLeft;
        positionPointer.dragStartAbsoluteX = e.clientX;
    });

    draggableDom.addEventListener('mousemove', (e) => {
        if (state.getter.getIsDragging()) {
            positionPointer.currentX = positionPointer.leftOffset + positionPointer.dragStartAbsoluteX - e.clientX;
            draggableDom.scrollTo({ left: positionPointer.currentX, behavior: "auto" });
        }
    });

    draggableDom.addEventListener('mouseup', (e) => {
        state.setter.setIsDragging(false);
        positionPointer.leftOffset = positionPointer.currentX;
    });

    draggableDom.addEventListener("mouseleave", (e) => {
        state.setter.setIsDragging(false);
        positionPointer.leftOffset = positionPointer.currentX;
    });

}
