import { animateRollingNews } from "../animation/rollingNewsAnimation.js";
import { rollingNewsEventNameList } from "../events/rollingNewsEvent.js";
import { Renderer } from "./Renderer.js";

class RollingNewsRenderer extends Renderer {
    /**
     * @constructor
     */
    constructor() {
        super();
        this.rollingNewsContainer = document.querySelector(".clipping-box");
    }

    _checkEventName(event) {
        return rollingNewsEventNameList.includes(event.eventName);
    }

    _render({ leftInfo, rightInfo, eventName }) {
        if (eventName === "init") {
            const rollingNewsElement = this.#generateRollingNewsElement(leftInfo, rightInfo);
            this.rollingNewsContainer.innerHTML = '';
            this.rollingNewsContainer.innerHTML += rollingNewsElement;

            animateRollingNews({ isLeftStopped: leftInfo.isStopped, isRightStopped: rightInfo.isStopped });
        } else if (eventName === "newsRolledFinished") {
            const [leftNewsTitle, rightNewsTitle] = Array.from(document.getElementsByClassName("content-sub-header__news-header"));
            const [leftHiddenNewsTitle, rightHiddenNewsTitle] = Array.from(document.getElementsByClassName("content-sub-header__news-header_invisible"));

            leftNewsTitle.innerHTML = leftInfo.title
            rightNewsTitle.innerHTML = rightInfo.title
            leftHiddenNewsTitle.innerHTML = leftInfo.hiddenTitle
            rightHiddenNewsTitle.innerHTML = rightInfo.hiddenTitle
        }
    }

    #generateRollingNewsElement(leftInfo, rightInfo) {
        return `
            <div class="content-sub-header">
                <div class="content-sub-header__box">
                    <h4 class="content-sub-header__title">연합뉴스</h4>
                    <span class="content-sub-header__news-header">${leftInfo.title}</span>
                </div>
                <div class="content-sub-header__box">
                    <h4 class="content-sub-header__title">연합뉴스</h4>
                    <span class="content-sub-header__news-header">${rightInfo.title}</span>
                </div>
            </div>
            <div class="content-sub-header">
                <div class="content-sub-header__box_invisible">
                    <h4 class="content-sub-header__title">연합뉴스</h4>
                    <span class="content-sub-header__news-header_invisible">${leftInfo.hiddenTitle}</span>
                </div>
                <div class="content-sub-header__box_invisible">
                    <h4 class="content-sub-header__title">연합뉴스</h4>
                    <span class="content-sub-header__news-header_invisible">${rightInfo.hiddenTitle}</span>
                </div>
            </div>`
    }
}

export { RollingNewsRenderer }