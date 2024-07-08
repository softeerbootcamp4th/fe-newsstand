export function renderMainContent() {
  return `
        <div class="main-header">
            <div class="main-header-tab">
                <p class="all selected-tab">전체 언론사</p>
                <p class="subscribe">내가 구독한 언론사</p>
            </div>
            <div class="main-header-icons">
                <img src="src/icons/list-view-checked.svg"> 
                <img src="src/icons/grid-view.svg" id="grid-view"> 
            </div>
        </div>
        <div class="all-cate-container column-flex">
            <div class="all-cate-header"></div>
            <div class="news-container column-flex">
                <div class="container-header">
                    <img alt="company-logo" id="logo">
                    <p class="edit-date"></p>
                    <div class="subscribe-btn"><span>+</span>구독하기</div>
                </div>
                <div class="news-item-container">
                    <div class="main-news column-flex"></div>
                    <div class="sub-news column-flex"></div>
                </div>
            </div>
        </div>
        <div class="subscribe-cate-container"></div>
            <div class="arrow left-btn">
        <img src="./src/images/LeftButton.png" alt="left-arrow">
    </div>
    <div class="arrow right-btn">
        <img src="./src/images/RightButton.png" alt="left-arrow">
    </div>
    `;
}
