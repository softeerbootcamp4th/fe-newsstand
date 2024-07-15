// pressCategory.js
import { separateId } from "../../../utils/utils.js";

const PressCategoryContainer = ({ 
    isAllPress, 
    tabFields,
    selectedIndex,
    onChangeCategory,
    countInfo,
}) => {
    const element = document.createElement('div');
    element.className = 'press-category-container';

    let buttons = [];
    let progressBars = [];

    function onClickEvent(event) {
        const intId = separateId(event.target.id);
   
        onChangeCategory(intId);
    }

    function updateSelectedButtonStyle() {
        buttons.forEach((button, index) => {
            const isSelected = index === selectedIndex;
            button.className = isSelected ? 'press-category-button-selected' :'press-category-button';

            updateInfoSpanStyle(button, isSelected);
            updateProgressBarStyle(index, isSelected);
        });
    }

    function updateInfoSpanStyle(button, isSelected) {
        const infoSpan = button.querySelector('.press-count-span');
        if (infoSpan) {
            if (isAllPress) {
                infoSpan.textContent = isSelected ? `${countInfo}` : "";
            } else {
                infoSpan.textContent = ">"
            }
        }
    }

    function updateProgressBarStyle(index, isSelected) {
        if (isSelected) {
            progressBars[index].classList.add('selected');
        } else {
            progressBars[index].classList.remove('selected');
        }
    }

    function createButtonHTML(category, index) {
        return `
            <button class="press-category-button" id="press-category-${index}">
                <div class="press-category-button-progress" id="press-category-${index}"></div>
                <div class="press-category-span-container" id="press-category-${index}">
                    <span id="press-category-${index}">${category.tabName}</span>
                    <span id="press-category-${index}" class="press-count-span"></span>
                </div>
            </button>
        `;
    }
    
    function renderButtons() {
        let buttonsHTML = '';
        tabFields.forEach((category, index) => {
            buttonsHTML += createButtonHTML(category, index);
        });
    
        element.innerHTML = buttonsHTML;
    
        buttons = Array.from(element.querySelectorAll('.press-category-button'));
        progressBars = Array.from(element.querySelectorAll('.press-category-button-progress'));
    }
    

    function addEventListeners() {
        buttons.forEach(button => {
            button.addEventListener('click', onClickEvent);
        });
    }

    function render() {
        renderButtons();
        addEventListeners();
        updateSelectedButtonStyle();
    }

    render();

    return {
        element
    };
};

export default PressCategoryContainer;