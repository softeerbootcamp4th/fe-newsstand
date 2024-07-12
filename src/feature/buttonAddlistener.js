import { removeRerendering } from "../rendering/removeRerendering.js";
import { init } from "./init.js";
import { getCurrentSelectedIndex } from "./handleCategoryClick.js";
import { clickSubscribeNews } from "./clickSubscribeNews.js";
import { clearIntervalVar, processCategory } from "./fieldTab.js";
import { allNewsData } from "../components/news.js";
import { scrollRender } from "../rendering/scrollRender.js";


export const buttonAddlistener = () => {
    const cancelAlert = document.getElementById("cancelAlert");
    const positiveButton = document.getElementById("positiveButton");
    const negativeButton = document.getElementById("negativeButton");
    const rightButton = document.getElementById("rightButton");
    const leftButton = document.getElementById("leftButton");

    positiveButton.addEventListener("mouseenter", () => {
        positiveButton.classList.replace("available-medium16", "hover-medium16");
    });

    negativeButton.addEventListener("mouseenter", () => {
        negativeButton.classList.replace("available-medium16", "hover-medium16");
    });

    positiveButton.addEventListener("mouseleave", () => {
        positiveButton.classList.replace("hover-medium16", "available-medium16");
    });

    negativeButton.addEventListener("mouseleave", () => {
        negativeButton.classList.replace("hover-medium16", "available-medium16");
    });

    positiveButton.addEventListener("click", () => {
        const $id = (id, element = document) => element.getElementById(id);
        const buttonClass = $id("allPress").className;
        removeRerendering(buttonClass === "selected-bold16");
    });

    negativeButton.addEventListener("click", () => {
        cancelAlert.classList.remove("show");
    });

    rightButton.addEventListener("click", async () => {
        const $id = (id, element = document) => element.getElementById(id);
        const buttonClass = $id("allPress").className;

        if (buttonClass === "selected-bold16") {
            let currentMidiaIndex = Number(document.getElementById('currentNewsIndex').textContent);
            clearIntervalVar();
            leftButton.className = "show";
            const liList = document.querySelectorAll("#NewsList ul li");
            let categoryIndex = getCurrentSelectedIndex(liList);
            const totalCompanies = allNewsData[categoryIndex].company.length;
            const currentSelectedLi = liList[categoryIndex];
            currentSelectedLi.classList.add("restartAnimation");
            setTimeout(() => {
                currentSelectedLi.classList.remove("restartAnimation");
                //restartAnimation(currentSelectedLi);
            }, 1);
            if (currentMidiaIndex + 1 === totalCompanies) {
                rightButton.className = `hidden`;
            }

            while (true) {
                await processCategory(categoryIndex, liList, true, false, currentMidiaIndex);
                categoryIndex = (categoryIndex + 1) % allNewsData.length;
                currentMidiaIndex = 0;
            }
        } else {
            const selectedLi = document.querySelector("#NewsList ul li.selectNews");
            const nextLi = selectedLi.nextElementSibling;

            if (nextLi) {
                const nextLiText = nextLi.textContent.trim();
                clickSubscribeNews(nextLiText);
                scrollRender();
            } else {
                const firstLiText =
                    selectedLi.parentElement.firstElementChild.textContent.trim();
                clickSubscribeNews(firstLiText);
                scrollRender();
            }
        }
    });

    leftButton.addEventListener("click", async () => {
        const $id = (id, element = document) => element.getElementById(id);
        const buttonClass = $id("allPress").className;
        if (buttonClass === "selected-bold16") {
            let currentMidiaIndex = Number(document.getElementById('currentNewsIndex').textContent);
            rightButton.classList.remove("hidden");
            clearIntervalVar();
            const liList = document.querySelectorAll("#NewsList ul li");
            currentMidiaIndex = currentMidiaIndex - 2;
            const categoryIndex = getCurrentSelectedIndex(liList);
            const currentSelectedLi = liList[categoryIndex];
            currentSelectedLi.classList.add("restartAnimation");
            setTimeout(() => {
                currentSelectedLi.classList.remove("restartAnimation");
                //restartAnimation(currentSelectedLi);
            }, 1);
            if (currentMidiaIndex === 0) {
                leftButton.classList.remove("show");
            }

            while (true) {
                await processCategory(categoryIndex, liList, true, false, currentMidiaIndex);
                categoryIndex = (categoryIndex + 1) % allNewsData.length;
                currentMidiaIndex = 0;
            }
        } else {
            const selectedLi = document.querySelector("#NewsList ul li.selectNews");
            const nextLi = selectedLi.previousElementSibling;


            if (nextLi) {
                const prevLiText = nextLi.textContent.trim();
                clickSubscribeNews(prevLiText);
                scrollRender();
            } else {
                const lastLiText =
                    selectedLi.parentElement.lastElementChild.textContent.trim();
                clickSubscribeNews(lastLiText);
                scrollRender();
            }
        }
    });

    init();
}