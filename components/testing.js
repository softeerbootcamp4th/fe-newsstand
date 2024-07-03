const svgFiles = [
    './image/grid.svg',
    './image/grid1.svg',
    './image/grid2.svg',
    './image/grid3.svg',
    './image/grid4.svg',
    './image/grid5.svg',
    './image/grid6.svg',
    './image/grid7.svg',
    './image/grid8.svg',
    './image/grid9.svg',
    './image/grid10.svg',
    './image/grid11.svg',

];

function createGridItems(numItems) {
    /*
    const gridContainer = document.createElement('div');
    gridContainer.classList.add('grid-container');
    document.body.appendChild(gridContainer);

    for (let i = 1; i <= numItems; i++) {
        const gridItem = document.createElement('div');
        gridItem.classList.add('grid-item');
        gridItem.textContent = i;
        gridContainer.appendChild(gridItem);
    } */
        const gridContainer = document.createElement('div');
        gridContainer.classList.add('grid-container');
        document.body.appendChild(gridContainer);
    
        for (let i = 1; i <= numItems; i++) {
            const gridItem = document.createElement('div');
            gridItem.classList.add('grid-item');
    
            // 랜덤한 SVG 파일 선택
            const randomIndex = Math.floor(Math.random() * svgFiles.length);
            const randomSVG = svgFiles[randomIndex];
    
            // SVG 이미지를 포함하는 <img> 요소 생성
            const svgImage = document.createElement('img');
            svgImage.src = randomSVG;
            svgImage.alt = `SVG Image ${i}`; // alt 속성 설정 (선택 사항)
    
            // 그리드 아이템에 SVG 이미지 추가
            gridItem.appendChild(svgImage);
    
            // 그리드 컨테이너에 그리드 아이템 추가
            gridContainer.appendChild(gridItem);
        }
}

// 4x6 그리드를 만들기 위해 총 24개의 아이템을 생성합니다.
createGridItems(24);

