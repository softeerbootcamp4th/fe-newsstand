import { separateId } from "../../../utils/utils.js";

class PressCategoryView {
    constructor({onClickCategory}) {
        this.element = document.createElement('div');
        this.element.className = 'press-category-container';
        this.categoryClickCallback = onClickCategory;
    }

    render() {
        this.element.innerHTML = '';
    }

    update( {tabFields, selectedCategoryIndex, isAllPress, countInfo}) {
        this.element.innerHTML = this.createButtonHTML(tabFields);
        this.attachButtonListeners();
        this.updateSelectedButtonStyle(selectedCategoryIndex, countInfo, isAllPress);
    }

    attachButtonListeners() {
        const buttons = this.element.querySelectorAll('.press-category-button');

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
                <button class="press-category-button" id=press-category-${index}>
                    <div class="press-category-button-progress"></div>
                    <div class="press-category-span-container">
                        <span>${category.tabName}</span>
                        <span class="press-count-span"></span>
                    </div>
                </button>
            `;
        });
        return buttonsHTML;
    }

    updateSelectedButtonStyle(selectedIndex, countInfo, isAllPress) {
        const buttons = this.element.querySelectorAll('.press-category-button');

        buttons.forEach((button, index) => {
            const isSelected = index === selectedIndex;
            button.className = isSelected ? 'press-category-button-selected' : 'press-category-button';
            this.updateInfoSpanStyle(button, isSelected, countInfo, isAllPress);
            this.updateProgressBarStyle(button, isSelected);
        });
    }

    updateProgressBarStyle(button, isSelected) {
        const progressBar = button.querySelector('.press-category-button-progress');
        if (isSelected) {
            progressBar.classList.add('selected');
        } else {
            progressBar.classList.remove('selected');
        }
    }

    updateInfoSpanStyle(button, isSelected, countInfo, isAllPress) {
        const infoSpan = button.querySelector('.press-count-span');
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
