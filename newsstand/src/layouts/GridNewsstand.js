import NewsBox from './components/newsBox.js';
import Button from '../components/base/Button.js';
import { mockData } from '../datas/mockData.js';

const GridNewsstand = () => {
    const newsBoxes = mockData.map((news, index) => {
        const newsBoxComponent = createComponent(NewsBox, { id : index + 1, icon : news.icon });
        return newsBoxComponent;
    });
    const buttonComponent = createComponent(Button, { id : generateRandomId(10), text : '구독하기', style : "width: 80px; height:10px;", variant : "white"});
    const buttonComponent2 = createComponent(Button, { id : generateRandomId(10), text : '해지하기', style : "width: 80px; height:10px;", variant : "gray"});

    return {
        element: `
        <div class="grid-news-container">
        </div>
        `,
    }
}

export default GridNewsstand;
