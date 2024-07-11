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
        this.element.innerHTML = this.createButtonHTML(isAllPress, tabFields, countInfo);
        this.updateSelectedButtonStyle(selectedCategoryIndex);
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

    createButtonHTML(isAllPress, tabFields, countInfo) {
        let buttonsHTML = '';
        tabFields.forEach((category, index) => {
            buttonsHTML += `
                <button class="press-category-button" id=press-category-${index}>
                    <div class="press-category-button-progress"></div>
                    <div class="press-category-span-container">
                        <span>${category.tabName}</span>
                        <span class="press-count-span">${isAllPress ? countInfo : '>'}</span>
                    </div>
                </button>
            `;
        });
        return buttonsHTML;
    }

    updateSelectedButtonStyle(selectedIndex) {
        const buttons = this.element.querySelectorAll('.press-category-button');

        buttons.forEach((button, index) => {
            const isSelected = index === selectedIndex;
            button.className = isSelected ? 'press-category-button-selected' : 'press-category-button';
            this.updateProgressBarStyle(button.querySelector('.press-category-button-progress'), isSelected);
        });
    }

    updateProgressBarStyle(progressBar, isSelected) {
        if (isSelected) {
            progressBar.classList.add('selected');
        } else {
            progressBar.classList.remove('selected');
        }
    }

    getElement() {
        return this.element;
    }
}

export default PressCategoryView;
