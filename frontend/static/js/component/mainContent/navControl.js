function removeSelected(navElements) {
    document.querySelectorAll(".mainContentNavCounter").forEach((element) => { element.remove(); });
    if (document.querySelector(".mainContentNavProgress") != null) document.querySelector(".mainContentNavProgress").remove();
    document.querySelectorAll(".absolute").forEach((element) => { element.classList.remove("absolute"); });
    navElements.forEach(element => {
        element.classList.remove("isSelected");
    });
}

function selected(index, totalIndex, selectedDom) {
    selectedDom.classList.add("isSelected");
    document.querySelector(".mainContentNavElement.isSelected>#text").classList.add("absolute");
    const template = `<div class="mainContentNavProgress"></div><span class="mainContentNavCounter" style="margin-left: 100px; opacity:99%;">${index + 1}</span><span class="mainContentNavCounter" style="opacity: 70%; margin-left:10px;"> / ${totalIndex}</span>`
    selectedDom.insertAdjacentHTML('beforeend', template);
}

export { removeSelected, selected };

