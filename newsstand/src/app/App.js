import AutoRollingNews from "../components/autoRollingNews/autoRollingNews.js";
import Header from "../views/header/header.js";
import Headline from "../views/headline/headline.js";
import Main from "../views/main/main.js";

// App 컴포넌트
export const App = () => {
    const appContainer = document.createElement('div');
    appContainer.className = 'content-container';

    const html = `
        <div class="main-container">
            <div class="header"></div>
            <div class="headline"></div>
            <div class="main"></div>
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

    function makeMain(appContainer) {
        const className = "main"
        const mainContainer = appContainer.querySelector(`.${className}`);

        if (!mainContainer) {
            console.log(`not founded main container with className ${className}`)
            return;
        }

        const main = Main();
        mainContainer.appendChild(main.element);
    }

    function initializeApp() {
        appContainer.innerHTML = html;

        makeHeader(appContainer);
        makeHeadline(appContainer);
        makeMain(appContainer);

        const appDiv = document.getElementById('app');
        if (appDiv) {
            appDiv.appendChild(appContainer);
        }
    }

    initializeApp();
}

App();
