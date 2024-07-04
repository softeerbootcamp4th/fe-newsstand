export function removeSelected(navElements) {
    // 1 / 81같이 기사의 수를 보여주는 것들을 전부 삭제
    document.querySelectorAll(".mainContentNavCounter").forEach((element) => { element.remove(); });
    // 해당 element에 progressbackground 삭제
    document.querySelector(".mainContentNavProgress").remove();
    // progress를 위해 걸오놓은 position: absolute삭제
    document.querySelectorAll(".absolute").forEach((element) => { element.classList.remove("absolute"); });
    // 모든 nav에 isSeleted class 삭제
    navElements.forEach(element => {
        element.classList.remove("isSelected");
    });
}

export function navSelected(data, selectedDom, timeOut) {
    // 현재 선택한 nav element에 선택했다는 class추가
    selectedDom.classList.add("isSelected");
    // 그 안에 존재하던 종합/경제와 같은 text를 postion: absolute로 변경
    // 이는 배경에 progressbar를 돌리기 위함
    document.querySelector(".mainContentNavElement.isSelected>#text").classList.add("absolute");
    // template literal을 통해 배경 prograss와 1/81같은 카운터를 추가하기 위한 div 생성
    // 이때 mainContentNavProgress가 생기면 자동으로 progress가 시작됨
    const template = `<div class="mainContentNavProgress"></div><span class="mainContentNavCounter" style="margin-left: 100px; opacity:99%;">${data}</span><span class="mainContentNavCounter" style="opacity: 70%; margin-left:10px;"> / 81</span>`
    // 현재 nav element에 주입
    selectedDom.insertAdjacentHTML('beforeend', template);
}

