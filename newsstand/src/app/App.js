import AutoRollingNews from "../components/autoRollingNews/autoRollingNews.js";
import NewsList from "../views/newsList.js";


// App 컴포넌트
export const App = () => {
    const appContainer = document.createElement('div');
    appContainer.className = 'content-container';

    const html = `
        <div class="main-container">
            <div class="title-container">
                <div class="logo-container">
                    <img src="../../assets/icons/newspaper.svg" alt="newspaper icon">
                    <span class="logo-label">뉴스스탠드</span>
                </div>
                <div class="day-label">2023. 02. 10. 금요일</div>
            </div>
            <div class="headline-container"></div>
            <div class="menu-container">
                <div class="subscribe-menu-container">
                    <button class="subscribe-menu-button">전체 언론사</button>
                    <button class="subscribe-menu-button">내가 구독한 언론사</button>
                </div>
                <div>
                    <img src="../../assets/icons/list-view.svg" alt="list view icon">
                    <img src="../../assets/icons/grid-view.svg" alt="grid view icon">
                </div>
            </div>
            <div class="newsList-container"></div>
        </div>
    `;


    function makeHeadline(appContainer) {
        const headlineContainer = appContainer.querySelector('.headline-container');
    
        const autoRollingNews1 = AutoRollingNews({
            company: '연합뉴스',
            title: '[1보] 김기현·안철수·천하람·황교안, 與전대 본경선 진출'
        });
        const autoRollingNews2 = AutoRollingNews({
            company: '중앙일보',
            title: '[2보] 새로운 뉴스 타이틀'
        });
    
        headlineContainer.appendChild(autoRollingNews1.element);
        headlineContainer.appendChild(autoRollingNews2.element);
    }

    function makeNewsList(appContainer) {
        const newsListContainer = appContainer.querySelector('.newsList-container');

        const newsList = NewsList();

        newsListContainer.appendChild(newsList.element);
    }

    function initializeApp() {
        appContainer.innerHTML = html;

        makeHeadline(appContainer);
        makeNewsList(appContainer);

        document.body.appendChild(appContainer);
    }

    initializeApp();
}

App()