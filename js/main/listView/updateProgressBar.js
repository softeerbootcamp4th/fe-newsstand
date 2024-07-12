/* 프로그래스바 생성 */
export function updateProgressBar(curCategoryIdx) {
    const categoryItems = document.querySelectorAll('.category-item');
    const selectedDiv = categoryItems[curCategoryIdx];

    const progressBarDivElement = document.createElement('div');
    progressBarDivElement.classList.add('progress-bar');
    selectedDiv.appendChild(progressBarDivElement);

    progressBarDivElement.style.animation = `progressAnimation ${20000 / 1000}s linear forwards`;
}
