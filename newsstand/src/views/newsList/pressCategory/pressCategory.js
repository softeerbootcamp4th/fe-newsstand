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
        const rootStyles = getComputedStyle(document.documentElement);

        buttons.forEach((button, index) => {
            const isSelected = index === selectedIndex;

            button.style.backgroundColor = isSelected ? rootStyles.getPropertyValue('--color-surface-brand-alt') : 'transparent';
            button.style.color = isSelected ? rootStyles.getPropertyValue('--color-text-white-default') : rootStyles.getPropertyValue('--color-text-weak');

            updateInfoSpanStyle(button, isSelected);
            updateProgressBarStyle(index, isSelected);
        });
    }

    function updateInfoSpanStyle(button, isSelected) {
        const infoSpan = button.querySelector('.press-count-span');
        if (infoSpan) {
            button.style.width = isSelected ? "166px" : "max-content";
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

    function createButton(category, index) {
        const button = document.createElement('button');
        button.className = 'press-category-button';
        button.id = `press-category-${index}`;

        const progressBar = document.createElement('div');
        progressBar.className = 'press-category-button-progress';   
        progressBar.id = `press-category-${index}`;

        const container = document.createElement('div');
        container.className = 'press-category-span-container';
        container.id = `press-category-${index}`;

        const tabNameSpan = document.createElement('span');
        tabNameSpan.id = `press-category-${index}`;
        tabNameSpan.textContent = category.tabName;

        const countSpan = document.createElement('span');
        countSpan.id = `press-category-${index}`;
        countSpan.className = `press-count-span`;
        countSpan.textContent = '';

        container.appendChild(tabNameSpan);
        container.appendChild(countSpan);

        button.appendChild(progressBar);
        button.appendChild(container);
        return button;
    }

    function renderButtons() {
        element.innerHTML = '';
        buttons = [];
        progressBars = [];
        tabFields.forEach((category, index) => {
            const button = createButton(category, index);
            element.appendChild(button);
            buttons.push(button);
            progressBars.push(button.querySelector('.press-category-button-progress'));
        });
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