import NewsBox from './components/newsBox.js';
import createComponent from './core/component/component.js';
import { mockData } from './datas/mockData.js';

const App = () => {
    const newsBoxes = mockData.map((news, index) => {
        const newsBoxComponent = createComponent(NewsBox, { id : index + 1, icon : news.icon });
        return newsBoxComponent;
    });

    return {
        element: `
        <div class="main-container">
            <div class="contents-container">
                <div class="header-container"> HEADER </div>
                <div class="rolling-news-container"> ROLLING NEWS </div>
                <div class="category-container"> CATEGORY </div>
                <div class="news-container">
                    ${newsBoxes.map(box => box.element).join('')}
                </div>
            </div>
        </div>
        `
    };
}

export default App;
