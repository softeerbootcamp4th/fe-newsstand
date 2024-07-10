import AutoRollingNews from "../../components/autoRollingNews/autoRollingNews.js";
import { HeadlineNews } from "./headlineNews.js";
import { IntervalKey, IntervalConst } from "../../namespace/intervalKey.js";
import intervalManager from "../../manager/intervalManager.js";

export const Headline = () => {
    let leftNewsIndex = 0;
    let rightNewsIndex = 1;

    let isLeftAutoRollingNewsHovered = false;
    let isRightAutoRllingNewsHovered = false;

    let leftAutoRollingNews;
    let rightAutoRollingNews;

    let element = document.createElement('div');
    element.className = 'headline-container';

    function rollLeftNews() {
        if (!isLeftAutoRollingNewsHovered) {

            leftNewsIndex += 2;
            leftNewsIndex = (leftNewsIndex) % HeadlineNews.length;

            leftAutoRollingNews.updateProps(HeadlineNews[leftNewsIndex]);
        }
    }

    function rollRightNews() {
        if (!isRightAutoRllingNewsHovered) {
            rightNewsIndex += 2;
            rightNewsIndex = (rightNewsIndex) % HeadlineNews.length;

            rightAutoRollingNews.updateProps(HeadlineNews[rightNewsIndex]);
        }
    }

    const render = () => {
        leftAutoRollingNews = AutoRollingNews({
            news: HeadlineNews[leftNewsIndex],
            handleHoverAction: changeLeftRollingStatus
        });

        rightAutoRollingNews = AutoRollingNews({
            news: HeadlineNews[rightNewsIndex],
            handleHoverAction: changeRightRollingStatus
        });

        element.innerHTML = '';
        element.appendChild(leftAutoRollingNews.element);
        element.appendChild(rightAutoRollingNews.element);

        startLeftRolling();
        startRightRolling();
    };

    function startLeftRolling() {
        intervalManager.startTimer(IntervalKey.RollingLeft, rollLeftNews, IntervalConst.RollingTime);
    }

    function startRightRolling() {
        setTimeout(() => {
            intervalManager.startTimer(IntervalKey.RollingRight, rollRightNews, IntervalConst.RollingTime);
        }, 1000); 
    }

    function changeLeftRollingStatus(status) {
        isLeftAutoRollingNewsHovered = status;
    }

    function changeRightRollingStatus(status) {
        isRightAutoRllingNewsHovered = status;
    }
    
    render();

    return {
        element
    };
};

export default Headline;
