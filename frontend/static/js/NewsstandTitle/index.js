import { dateFormatter } from "../utils/dateFormatter.js";

const id = "newstandTitle"
function init() {
    const generateTemplate = () => {
        return `<header id="header" class="Layout__row-between">
                        <img src="./static/assets/images/headerTitle.svg" alt="Description of SVG">
                       <div id="headerDate" class="datetext">${getTimetoString("yyyy. MM. dd. DDD")}</div>
                    </header>
                    `
    }

    return generateTemplate()
}

function actions() { return new Map() }

function getTimetoString(format) {
    const currentTime = new Date();
    return dateFormatter(currentTime, format);
}

export { actions, id, init };

