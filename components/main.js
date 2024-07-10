export function renderMainContent() {
  return `
        <div class="main-header">
            <div class="main-header-tab">
                <p class="all selected-tab">전체 언론사</p>
                <p class="subscribe">내가 구독한 언론사</p>
            </div>
            <div class="main-header-icons">
                <img src="src/icons/list-view.svg" class="list-view"> 
                <img src="src/icons/grid-view-checked.svg" class="grid-view selected-icon "> 
            </div>
        </div>
        <div class="grid-view-container selected-view"></div>
        <div class="subscribe-cate-container"></div>
            <div class="arrow left-btn">
        <img src="./src/images/LeftButton.png" alt="left-arrow">
    </div>
    <div class="arrow right-btn">
        <img src="./src/images/RightButton.png" alt="left-arrow">
    </div>
    `;
}
