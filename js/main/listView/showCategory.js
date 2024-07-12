export function showCategory(index) {
    const parentDiv = document.querySelector('.list-view-header');
    const selectedDiv = parentDiv.children[index];
    selectedDiv.classList.add('selected');
}
