export function updateBtnVisibility(prevCategoryType, curCategoryIdx, curNewsIdx, newsData) {
    const leftBtn = document.querySelector('.left-btn');
    const rightBtn = document.querySelector('.right-btn');

    if(prevCategoryType === 'subscribe' || curNewsIdx === 0 ) {
        leftBtn.style.display = "none";
    }
    else {
        leftBtn.style.display = "block";
    }

    if(prevCategoryType === 'subscribe') {        
        rightBtn.style.display = "none";
        return;
    }
        
    if(curNewsIdx === newsData[curCategoryIdx].news.length-1) {
        rightBtn.style.display = "none";
    }
    else {
        rightBtn.style.display = "block";
    }
}
