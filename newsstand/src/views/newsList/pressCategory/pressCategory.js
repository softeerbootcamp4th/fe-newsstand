// pressCategory.js
import { separateId } from "../../../utils/utils.js";

const PressCategoryContainer = ({ tabs, onChangeCategory }) => {
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
            const isSelected = tabs[index].selectedIndex !== undefined;

            button.style.backgroundColor = isSelected ? rootStyles.getPropertyValue('--color-surface-brand-alt') : 'transparent';
            button.style.color = isSelected ? rootStyles.getPropertyValue('--color-text-white-default') : rootStyles.getPropertyValue('--color-text-weak');

            const categoryCountSpan = button.querySelector('.press-count-span');
            if (categoryCountSpan) {
                button.style.width = isSelected ? "166px" : "max-content";
                categoryCountSpan.textContent = isSelected ? `${tabs[index].selectedIndex + 1}/${tabs[index].tabDataCount}` : "";
            }

            if (isSelected) {
                progressBars[index].classList.add('selected');
            } else {
                progressBars[index].classList.remove('selected');
            }
        });
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
        tabs.forEach((category, index) => {
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