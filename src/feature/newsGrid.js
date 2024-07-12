import { allNewsData } from "../components/news.js";
import { handlePressInfoButtonClick } from "./handlePressInfoButtonClick.js";
import { getSubscribedData } from "./subscribeData.js";
import { pressInfoButton } from "../components/button.js";

export const newsGrid = (index, isSubscribe) => {
    const newsData = allNewsData.flatMap((category) => category.company);

    let subscribedData = getSubscribedData();

    const gridView = document.getElementById("gridView");
    gridView.innerHTML = "";
    const numIcons = 24 * index;
    if (!isSubscribe) {
        for (let i = numIcons; i < numIcons + 24; i++) {
            if (i < newsData.length) {
                const cell = document.createElement("div");
                cell.className = "cell";

                const img = document.createElement("img");
                img.src = `${newsData[i].companyIcon}`;
                img.alt = `${newsData[i].companyName}`;

                cell.appendChild(img);
                gridView.appendChild(cell);
                cell.addEventListener("mouseenter", () => {
                    cell.innerHTML = `${pressInfoButton(
                        subscribedData.includes(newsData[i].companyName)
                            ? "해지하기"
                            : "구독하기"
                    )}`;
                    const button = cell.querySelector("button");
                    handlePressInfoButtonClick(
                        button,
                        newsData[i],
                        subscribedData,
                        false
                    );
                    subscribedData = getSubscribedData();
                });
                cell.addEventListener("mouseleave", () => {
                    cell.innerHTML = "";
                    cell.appendChild(img);
                });
            }
        }
    } else {
        for (let i = numIcons; i < numIcons + 24; i++) {
            if (i < subscribedData.length) {
                const newsData = allNewsData
                    .flatMap((category) => category.company)
                    .find((company) => company.companyName === subscribedData[i]);
                const cell = document.createElement("div");
                cell.className = "cell";

                const img = document.createElement("img");
                img.src = `${newsData.companyIcon}`;
                img.alt = `${newsData.companyName}`;

                cell.appendChild(img);
                gridView.appendChild(cell);
                cell.addEventListener("mouseenter", () => {
                    cell.innerHTML = `${pressInfoButton(
                        subscribedData.includes(newsData.companyName)
                            ? "해지하기"
                            : "구독하기"
                    )}`;
                    const button = cell.querySelector("button");
                    handlePressInfoButtonClick(button, newsData, subscribedData, false);
                });
                cell.addEventListener("mouseleave", () => {
                    cell.innerHTML = "";
                    cell.appendChild(img);
                });
            }
        }
    }
};
