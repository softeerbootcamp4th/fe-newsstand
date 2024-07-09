export function removeAllChild(element) {
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
}
