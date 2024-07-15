import { initializeData, initializeEvent, initializeScreen } from "./scripts/initialize.js";

initializeData()
.then(_ => {
    initializeEvent();
    initializeScreen();
})
