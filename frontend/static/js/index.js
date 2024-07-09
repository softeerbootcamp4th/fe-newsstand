import { NEWS } from "../data/data.js";
import * as mainContent from "./mainContent/index.js";
import * as mainContentSelector from "./mainContentSelector/index.js";
import * as title from "./newsstandTitle/index.js";
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

    document.body.addEventListener('click', event => reducer.click(event))
    document.getElementById("newsstand").insertAdjacentHTML("afterbegin", template);
    ticker.domDidLoad(NEWS)
    mainContent.domDidLoad(NEWS)
});

const stylesheets = [
    "static/js/newsstandTitle/newstandTitle.css",
    "static/js/ticker/ticker.css",
    "static/js/mainContentSelector/mainContentSelector.css"
];

stylesheets.forEach(loadCSS);

function loadCSS(url) {
    document.head.insertAdjacentHTML(
        "beforeend",
        `<link rel='stylesheet' type='text/css' href='${url}'/>`,
    );
}
