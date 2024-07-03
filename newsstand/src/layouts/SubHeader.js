import createComponent from "../core/component/component.js";
import AutoRollingNews from "../components/AutoRollingNews.js";
import { generateRandomId } from "../utils/idGenerator.js";

const SubHeader = () => {
    const leftAutoRollingNews = createComponent(AutoRollingNews, {id : generateRandomId(10), style : "width: 50%;"});
    const rightAutoRollingNews = createComponent(AutoRollingNews, {id : generateRandomId(10), style : "width: 50%;"});

    return {
        element: `
        <div class="rolling-news-container"> 
            ${leftAutoRollingNews.element}
            ${rightAutoRollingNews.element}
        </div>
        `,
    }
}

export default SubHeader;
