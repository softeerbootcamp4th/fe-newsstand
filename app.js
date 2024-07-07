import { NewsPage } from "./pages/NewsPage.js";

const initApp = () => {
    const app = document.querySelector('#app');
    NewsPage(app);
}

initApp();