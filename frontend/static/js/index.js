import * as mainContent from "./component/mainContent/index.js";
import * as mainContentSelector from "./component/mainContentSelector/index.js";
import * as title from "./component/newsstandTitle/index.js";
import * as ticker from "./component/ticker/index.js";
import { reducer, reducerInit } from "./reducer.js";
import * as ticker from "./ticker/index.js";

document.addEventListener('DOMContentLoaded', function () {
    const template = reducerInit(
        [
            title.actions,
            ticker.actions,
            mainContentSelector.actions,
            mainContent.actions
        ],
        title.init(),
        ticker.init(),
        mainContentSelector.init(),
        mainContent.init()
    )

    document.body.addEventListener('click', event => reducer.click(event), true)
    document.getElementById("newsstand").insertAdjacentHTML("afterbegin", template);
    ticker.domDidLoad(NEWS)
    mainContent.domDidLoad(NEWS)
});

const stylesheets = [
    "static/js/component/newsstandTitle/newstandTitle.css",
    "static/js/component/ticker/ticker.css",
    "static/js/component/mainContentSelector/mainContentSelector.css"
];

stylesheets.forEach(loadCSS);

function loadCSS(url) {
    document.head.insertAdjacentHTML(
        "beforeend",
        `<link rel='stylesheet' type='text/css' href='${url}'/>`,
    );
}
