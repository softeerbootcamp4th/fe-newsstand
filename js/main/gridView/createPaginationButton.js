import { createGridItem } from "./createGridItem.js";
import { updatePaginationButtons } from "./updatePaginationButtons.js";

const itemsPerPage = 24;
export function createPaginationButtons(currentPage, companies) {
    const leftBtn = document.querySelector('.left-btn.grid');
    const rightBtn = document.querySelector('.right-btn.grid');

    rightBtn.addEventListener('click', () => {
        if ((currentPage + 1) * itemsPerPage < companies.length) {
            currentPage++;
            createGridItem(companies, currentPage);
        }
        
    });

    leftBtn.addEventListener('click', () => {
        if (currentPage > 0) {
            currentPage--;
            createGridItem(companies, currentPage);
        }
    });

    updatePaginationButtons(currentPage, companies.length);
}
