/**
 * @description 언론사 필터를 렌더하는 함수
 */
export function renderMediaDisplay() {
    /**
     * @NOTE 기본값으로 그리드가 보여짐
     */
    const mediaDisplayDOM = document.querySelector("#display-style");
    mediaDisplayDOM.addEventListener("click", clickMediaDisplay)
}

/**
 * @description 보기 형식을 클릭했을때 호출되는 함수
 */
function clickMediaDisplay(e) {
    const displayId = e.target.id;
    const mediaDisplayDOM = document.querySelector("#display-style");

    if (displayId === "display-list") {
        setSelectedDisplay("display-list");
        setUnelectedDisplay("display-grid");
        
        mediaDisplayDOM.dataset.selectedDisplay = "display-list";
    } else if (displayId === "display-grid") {
        setSelectedDisplay("display-grid");
        setUnelectedDisplay("display-list");

        mediaDisplayDOM.dataset.selectedDisplay = "display-grid";
    }
}

/**
 * @description 선택된 형식을 처리하는 함수
 */
function setSelectedDisplay(targetId) {
    const selectedDisplayDOM = document.querySelector(`#${targetId}`);
    const imgSrc = selectedDisplayDOM.src;
    const activeImgSrc = imgSrc.replace("-inactive", "-active");

    selectedDisplayDOM.src = activeImgSrc;
}
/**
 * @description 선택되지 않은 형식을 처리하는 함수
 */
function setUnelectedDisplay(targetId) {
    const unselectedDisplayDOM = document.querySelector(`#${targetId}`);
    const imgSrc = unselectedDisplayDOM.src;
    const inactiveImgSrc = imgSrc.replace("-active", "-inactive");

    unselectedDisplayDOM.src = inactiveImgSrc;
}