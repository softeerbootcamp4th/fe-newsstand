import { category } from "./data.js";

const parentDiv = document.querySelector('.all-cate-header');

// 카테고리 아이템 생성 및 추가
category.forEach(cat => {
    const divElement = document.createElement('div');
    divElement.classList.add('category-item');
    
    const textElement = document.createElement('span');
    textElement.textContent = cat;
    textElement.classList.add('category-text');
    
    divElement.appendChild(textElement);
    parentDiv.appendChild(divElement);
});

const progressBar = document.querySelector('.progress .progress-bar');

let curIndex = 0;
const intervalTime = 20000;

// 초기 카테고리 표시
showCategory(curIndex);

// 20초마다 다음 카테고리 선택 및 프로그레스바 업데이트
setInterval(() => {
    curIndex = (curIndex + 1) % category.length;
    showCategory(curIndex);
}, intervalTime);

function showCategory(index) {
    // 모든 카테고리 아이템 초기화 (스타일 제거)
    const categoryItems = document.querySelectorAll('.category-item');
    categoryItems.forEach(item => {
        item.classList.remove('selected');
        const progressBarDivElement = item.querySelector('.progress-bar');
        if (progressBarDivElement) {
            progressBarDivElement.remove(); // 프로그래스 바 제거
        }
    });

    // 선택된 카테고리 스타일 적용
    const selectedDiv = parentDiv.children[index];
    selectedDiv.classList.add('selected');
    selectedDiv.querySelector('.category-text').textContent = category[index];

    const progressBarDivElement = document.createElement('div');
    progressBarDivElement.classList.add('progress-bar');
    selectedDiv.appendChild(progressBarDivElement);

    progressBarDivElement.style.animation = `progressAnimation ${intervalTime / 1000}s linear forwards`;
}
