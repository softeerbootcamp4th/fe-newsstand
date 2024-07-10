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
\    <div class="subscribe-cate-container"></div>
    `;
}
