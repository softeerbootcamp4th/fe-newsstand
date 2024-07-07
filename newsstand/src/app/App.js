import AutoRollingNews from "../components/autoRollingNews/autoRollingNews.js";
import Header from "../views/header/header.js";
import Headline from "../views/headline/headline.js";
import NewsList from "../views/newsList/newsList.js";
import { PressMenu } from "../views/pressMenu/pressMenu.js";

// App 컴포넌트
export const App = () => {
    const appContainer = document.createElement('div');
    appContainer.className = 'content-container';

    const html = `
        <div class="main-container">
            <div class="header"></div>
            <div class="headline"></div>
            <div class="press-menu"></div>
            <div class="newsList"></div>
        </div>
    `;

    function makeHeader(appContainer) {
        const className = "header"
        const headerContainer = appContainer.querySelector(`.${className}`);

        if (!headerContainer) {
            console.log(`not founded header container with className ${className}`)
            return;
        }

        const header = Header();
        headerContainer.appendChild(header.element);
    }

    function makeHeadline(appContainer) {
        const className = "headline"
        const headlineContainer = appContainer.querySelector(`.${className}`);

        if (!headlineContainer) {
            console.log(`not founded headline container with className ${className}`)
            return;
        }

        const headline = Headline();
    
        headlineContainer.appendChild(headline.element);
    }

    function makePressMenu(appContainer) {
        const className ="press-menu"
        const pressMenuContainer = appContainer.querySelector(`.${className}`);

        if (!pressMenuContainer) {
            console.log(`not founded pressMenu container with className ${className}`)
            return;
        }

        const pressMenu = PressMenu();
    
        pressMenuContainer.appendChild(pressMenu.element);
    }

    function makeNewsList(appContainer) {
        const className = "newsList"
        const newsListContainer = appContainer.querySelector(`.${className}`);

        if (!newsListContainer) {
            console.log(`not founded newsList container with className ${className}`)
            return;
        }

        const newsList = NewsList();

        newsListContainer.appendChild(newsList.element);
    }

    function initializeApp() {
        appContainer.innerHTML = html;

        makeHeader(appContainer);
        makeHeadline(appContainer);
        makePressMenu(appContainer);
        makeNewsList(appContainer);

        const appDiv = document.getElementById('app');
        if (appDiv) {
            appDiv.appendChild(appContainer);
        }
    }

    initializeApp();
}

App();
