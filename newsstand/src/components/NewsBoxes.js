import createComponent from '../core/component/component.js';
import useState from '../core/hooks/useState.js';
import { mockData } from '../datas/mockData.js';
import NewsBox from './newsBox.js';

const NewsBoxes = () => {
    const [newsBoxes, setNewsBoxes] = useState(mockData);

    const handleMouseOver = (index) => {
        console.log(`NewsBox ${index + 1} HOVER!`);
        const updatedNewsBoxes = [...newsBoxes];
        updatedNewsBoxes[index].isHover = true;
        setNewsBoxes(updatedNewsBoxes);
    };

    const handleMouseOut = (index) => {
        console.log(`NewsBox ${index + 1} UNHOVER!`);
        const updatedNewsBoxes = [...newsBoxes];
        updatedNewsBoxes[index].isHover = false;
        setNewsBoxes(updatedNewsBoxes);
    };

    return {
        element: `
        <div class="news-container">
            ${newsBoxes.map((box, index) => {
                // createComponent를 사용하여 NewsBox 컴포넌트를 생성
                const NewsBoxComponent = createComponent(NewsBox, {
                    icon: box.icon,
                    isHover: box.isHover || false,
                    onMouseOver: () => handleMouseOver(index),
                    onMouseOut: () => handleMouseOut(index),
                });

                return `
                    ${NewsBoxComponent.element}
                `;
            }).join('')}
        </div>
        `,
    };
};

export default NewsBoxes;
