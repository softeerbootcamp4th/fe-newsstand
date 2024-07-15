import { buttonAddlistener } from "./feature/buttonAddlistener.js";
import { autoRollingNews } from "./feature/autoRollingNews.js";
import { topAndViewer } from "./rendering/topAndViewer.js";
import { getDate } from "./feature/date.js";
import { init } from "./feature/init.js";

document.addEventListener("DOMContentLoaded", async () => {
    buttonAddlistener();
    autoRollingNews();
    topAndViewer();
    getDate();
    init();
});