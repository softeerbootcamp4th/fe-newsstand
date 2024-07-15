
export function initializeHeaderScroll() {
    const header = document.querySelector('.list-view-header');

    header.addEventListener('wheel', (event) => {
        if (event.deltaY === 0) return;
        event.preventDefault();
        header.scrollLeft += event.deltaY;
});
}
