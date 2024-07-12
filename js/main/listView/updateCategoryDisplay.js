export function updateCategoryDisplay(curCategoryIdx, prevCategoryType, newsData, curNewsIdx) {
    const categoryItems = document.querySelectorAll('.category-item');
    categoryItems.forEach((item, index) => {
        // 기존의 인덱스 요소 제거
        const existingIndexElement = prevCategoryType === 'all' ? item.querySelector('.index-text') : item.querySelector('.arrow-icon');
        if (existingIndexElement) {
            existingIndexElement.remove();
        }

        if(prevCategoryType === 'all') {
            // 새로운 인덱스 요소 생성 및 추가
            const textElement = document.createElement('span');
            textElement.classList.add('index-text');

            if (index === curCategoryIdx) {
                textElement.textContent = `${curNewsIdx + 1} / ${newsData[curCategoryIdx].news.length}`;
                item.classList.add('selected-category'); 
            } else {
                item.classList.remove('selected-category'); 
            }

            item.appendChild(textElement);
        }
        else {
            const imgElement = document.createElement('img');
            imgElement.classList.add('arrow-icon');
            if (index === curCategoryIdx) {
                imgElement.src = './src/icons/chevron-right.svg';
                imgElement.style.display = 'block';
                item.classList.remove('selected-category'); 
            } else {
                item.classList.remove('selected-category'); 
            }
            item.appendChild(imgElement);
        }
    });
}
