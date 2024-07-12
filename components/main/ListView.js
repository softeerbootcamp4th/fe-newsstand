export const ListView = `
    <div class="list-view-container selected-view column-flex">
        <div class="list-view-header"></div>
        <div class="info hidden">구독한 언론사가 없습니다.</div>
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
    <div class="arrow left-btn list">
        <img src="./src/images/LeftButton.png" alt="left-arrow">
    </div>
    <div class="arrow right-btn list">
        <img src="./src/images/RightButton.png" alt="left-arrow">
    </div>
`;
