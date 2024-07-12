import { ListView } from "../../components/main/ListView.js";
import { GridView } from "../../components/main/GridView.js";
import { initalizeSubscribeFunction, initializeGridViewContainer, initlizeListViewFunction } from "./init.js";
import { handleClickTab } from "./toggleView.js";

/*
    Tab 이동 후 그에 맞는 view 렌더링 함수
*/

export const switchView = (prevTabType, viewType) => {
    const mainHeader = document.querySelector('.main-header');
    const listViewIcon = document.querySelector(".list-view");
    const gridViewIcon = document.querySelector(".grid-view");

    if (viewType === 'list-view') {
        gridViewIcon.classList.remove("selected-icon");
        gridViewIcon.src = "./src/icons/grid-view.svg";

        document.querySelector('.grid-view-container').remove();
        document.querySelector('.arrow.right-btn.grid').remove();
        document.querySelector('.arrow.left-btn.grid').remove();

        listViewIcon.classList.add("selected-icon");
        listViewIcon.src = "./src/icons/list-view-checked.svg";

        mainHeader.insertAdjacentHTML(
            "afterend", ListView
        );

        initalizeSubscribeFunction();
        initlizeListViewFunction();
        handleClickTab('list-view', prevTabType);

    } else if (viewType === 'grid-view') {
        listViewIcon.classList.remove("selected-icon");
        listViewIcon.src = "./src/icons/list-view.svg";

        document.querySelector('.list-view-container').remove();
        document.querySelector('.arrow.right-btn.list').remove();
        document.querySelector('.arrow.left-btn.list').remove();

        gridViewIcon.classList.add("selected-icon");
        gridViewIcon.src = "./src/icons/grid-view-checked.svg";

        mainHeader.insertAdjacentHTML(
            "afterend", GridView
        );

        initializeGridViewContainer('prevTabType');
        handleClickTab('grid-view', prevTabType);
    }
};
