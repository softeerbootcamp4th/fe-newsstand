import { separateId } from "../../../utils/utils.js";

const CLASS = Object.freeze({
    PRESS_CATEGORY_CONTAINER: 'press-category-container',
    PRESS_CATEGORY_BUTTON: 'press-category-button',
    PRESS_CATEGORY_BUTTON_SELECTED: 'press-category-button-selected',
    PRESS_CATEGORY_BUTTON_PROGRESS: 'press-category-button-progress',
    PRESS_CATEGORY_SPAN_CONTAINER: 'press-category-span-container',
    PRESS_COUNT_SPAN: 'press-count-span',
    SELECTED: 'selected'
});

class PressCategoryView {
    constructor({ onClickCategory }) {
        this.element = document.createElement('div');
        this.element.className = CLASS.PRESS_CATEGORY_CONTAINER;
        this.categoryClickCallback = onClickCategory;
    }

    render() {
        this.element.innerHTML = '';
    }

    update({ tabFields, selectedCategoryIndex, isAllPress, countInfo }) {
        this.element.innerHTML = this.createButtonHTML(tabFields);
        this.attachButtonListeners();
        this.updateSelectedButtonStyle(selectedCategoryIndex, countInfo, isAllPress);
    }

    attachButtonListeners() {
        const buttons = this.element.querySelectorAll(`.${CLASS.PRESS_CATEGORY_BUTTON}`);

        buttons.forEach(button => {
            button.addEventListener('click', () => {
                const intId = separateId(button.id);
                this.categoryClickCallback(intId);
            });
        });
    }

    createButtonHTML(tabFields) {
        let buttonsHTML = '';
        tabFields.forEach((category, index) => {
            buttonsHTML += `
                <button class="${CLASS.PRESS_CATEGORY_BUTTON}" id="press-category-${index}">
                    <div class="${CLASS.PRESS_CATEGORY_BUTTON_PROGRESS}"></div>
                    <div class="${CLASS.PRESS_CATEGORY_SPAN_CONTAINER}">
                        <span>${category.tabName}</span>
                        <span class="${CLASS.PRESS_COUNT_SPAN}"></span>
                    </div>
                </button>
            `;
        });
        return buttonsHTML;
    }

    updateSelectedButtonStyle(selectedIndex, countInfo, isAllPress) {
        const buttons = this.element.querySelectorAll(`.${CLASS.PRESS_CATEGORY_BUTTON}`);

        buttons.forEach((button, index) => {
            const isSelected = index === selectedIndex;
            button.className = isSelected ? CLASS.PRESS_CATEGORY_BUTTON_SELECTED : CLASS.PRESS_CATEGORY_BUTTON;
            this.updateInfoSpanStyle(button, isSelected, countInfo, isAllPress);
            this.updateProgressBarStyle(button, isSelected);
        });
    }

    updateProgressBarStyle(button, isSelected) {
        const progressBar = button.querySelector(`.${CLASS.PRESS_CATEGORY_BUTTON_PROGRESS}`);
        if (isSelected) {
            progressBar.classList.add(CLASS.SELECTED);
        } else {
            progressBar.classList.remove(CLASS.SELECTED);
        }
    }

    updateInfoSpanStyle(button, isSelected, countInfo, isAllPress) {
        const infoSpan = button.querySelector(`.${CLASS.PRESS_COUNT_SPAN}`);
        if (infoSpan) {
            if (isAllPress) {
                infoSpan.textContent = isSelected ? `${countInfo}` : "";
            } else {
                infoSpan.textContent = isSelected ? ">" : "";
            }
        }
    }

    getElement() {
        return this.element;
    }
}

export default PressCategoryView;