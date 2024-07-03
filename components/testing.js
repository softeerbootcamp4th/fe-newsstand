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
    './image/grid12.svg',
    './image/grid13.svg',
    './image/grid14.svg',
    './image/grid15.svg',
    './image/grid16.svg',
    './image/grid17.svg',
    './image/grid18.svg',
    './image/grid19.svg',
    './image/grid20.svg',
    './image/grid21.svg',
    './image/grid22.svg',
    './image/grid23.svg',

];

const svgfilenames = ['서울경제','데일리안', '헤럴드경제', 'SBS Biz', '세계일보', '아시아경제','이데일리', '조선일보', '아이뉴스24', 
    '파이낸셜뉴스', '스포츠서울', '스포츠동아', '석간 문화일보', 'KBS WORLD', '중앙데일리', '인사이트', '법률 방송뉴스', '시사저널e', 'RBS 한국농어촌방송', 
    '조이뉴스24', '에너지경제', '비즈니스포스트', 'CEO스코어데일리', 'KNN'];

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

