export function updatePaginationButtons(currentPage, length) {
    const leftBtn = document.querySelector('.left-btn.grid');
    const rightBtn = document.querySelector('.right-btn.grid');

    if (currentPage === 0) {
        leftBtn.style.display = 'none';
    } else {
        leftBtn.style.display = 'block';
    }

    if ((currentPage + 1) * 24 >= length) {
        rightBtn.style.display = 'none';
    } else {
        rightBtn.style.display = 'block';
    }
}
