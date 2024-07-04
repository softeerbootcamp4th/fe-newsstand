export function removeSelected(navElements) {
    document.querySelectorAll(".mainContentNavCounter").forEach((element) => { element.remove(); });
    document.querySelector(".mainContentNavProgress").remove();
    document.querySelectorAll(".absolute").forEach((element) => { element.classList.remove("absolute"); });
    navElements.forEach(element => {
        element.classList.remove("isSelected");
    });
}

export function navSelected(data, selectedDom, timeOut) {
    selectedDom.classList.remove("isSelected");
    selectedDom.classList.add("isSelected");
    document.querySelector(".mainContentNavElement.isSelected>#text").classList.remove("absolute");
    document.querySelector(".mainContentNavElement.isSelected>#text").classList.add("absolute");
    const template = `<div class="mainContentNavProgress"></div><span class="mainContentNavCounter" style="margin-left: 100px; opacity:99%;">${data}</span><span class="mainContentNavCounter" style="opacity: 70%; margin-left:10px;"> / 81</span>`
    selectedDom.insertAdjacentHTML('beforeend', template);
}

