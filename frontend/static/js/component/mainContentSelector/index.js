const id = "mainContentSelector"
let state = {
    viewMode: "list", // "grid"
    filter: "all" // "myCompanies"
}
function init() {
    const generateTemplate = () =>
        `<div id="mainContentSelector" class="Layout__row-between">
                <div class="Layout__row gap10">
                    <span class="mainContentSelectorElement isSelected all">전체 언론사</span>
                    <span class="mainContentSelectorElement myCompanies">내가 구독한 언론사</span>
                </div>
                <div class="Layout__row alignItems-center gap10">
                    <img class="modeImg list" src="./static/assets/images/list-view.svg" alt="Description of SVG">
                    <img class="modeImg grid" src="./static/assets/images/grid-view.svg" alt="Description of SVG">
                </div>
            </div>
            `

    return generateTemplate()
}
function actions() {
    const tempMap = new Map()
    tempMap.set("changeViewMode", function (viewmode) {
        if (state["viewMode"] != viewmode) {
            // const willDisAppearImage = document.querySelector(`.modeImg>.${state.viewmode}`)
            // state.viewmode = viewmode
            // const willAppearImage = document.querySelector(`.modeImg>.${state.viewmode}`)
            // 여기서 이미지 이제 색깔 처리
        }
    })

    tempMap.set("changeFilter", (filter) => {
        if (state.filter != filter) {
            const willAppearImage = Array.from(document.querySelectorAll(`.mainContentSelectorElement`)).filter(element => !element.classList.contains("isSelected"))
            document.querySelector(".mainContentSelectorElement.isSelected").classList.remove("isSelected")
            willAppearImage[0].classList.add("isSelected")
            state.filter = filter
        }
    })

    return tempMap
}

export { actions, id, init, state }

