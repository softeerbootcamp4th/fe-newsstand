import createComponent from './core/component/component.js';
import NewsBoxes from './components/NewsBoxes.js';

const App = () => {
    const newsBoxes = createComponent(NewsBoxes);
    
    return {
        element: `
        <div class="main-container">
            <div class="contents-container">
                <div class="header-container"> HEADER </div>
                <div class="rolling-news-container"> ROLLING NEWS </div>
                <div class="category-container"> CATEGORY </div>
                ${newsBoxes.element}
            </div>
        </div>
        `
    };
}

export default App;
