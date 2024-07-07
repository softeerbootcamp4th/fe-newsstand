import { dateText } from "../../pages/state/newsState";

export const createHeader = () => {
    return `
        <div class="header-wrapper flex-row-between">
            <div class="title-wrapper flex-row-between">
                <img class="news-paper" src="/icons/newspaper.png" width="24px" height="24px">
                <h3 class="title-text">
                    뉴스 스탠드
                </h3>
            </div>
            <h3 class="date-text inline-tag">
                ${dateText}
            </h3>
        </div>
    `
}