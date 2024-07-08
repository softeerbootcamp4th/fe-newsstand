import { separateId } from "../../../utils/utils.js";

export const ProgressCategoryContainer = ({ tabs, selectedId: initialSelectedId, onChangeCategory }) => {
    const element = document.createElement('div');
    element.className = 'press-category-container';

    let buttons = [];
    let progressBars = [];
    let selectedId = initialSelectedId;
    let progressInterval;
    let lastIndexUpdate = null;

    const rootStyles = getComputedStyle(document.documentElement);
    const categories = transformTabsToCategories(tabs);

    function transformTabsToCategories(tabs) {
        return tabs.map((tab, index) => ({
            id: index,
            title: tab,
            nowIndex: 1,
            total: 4,
        }));
    } 

    function clearCurrentInterval() {
        if (progressInterval) {
            clearInterval(progressInterval);
        }
    }

    function autoChangeCategory() {
        const currentIndex = separateId(selectedId);
        const currentCategory = categories[currentIndex];

        if (currentCategory.nowIndex < currentCategory.total) {
            currentCategory.nowIndex += 1;
            updateCategoryIndex(currentCategory.nowIndex);
        } else {
            const nextId = (currentIndex + 1) % categories.length;
            const newSelectedId = `press-category-${nextId}`;
            onChangeCategory(newSelectedId);
        }
    }

    function updateCategoryIndex(index) {
        if (lastIndexUpdate !== index) {
            lastIndexUpdate = index;
            onChangeCategoryIndex(index);
        }
    }

    function onClickEvent(event) {
        clearCurrentInterval();
        const intId = separateId(event.target.id);
        const id = `press-category-${intId}`;

        if (id !== selectedId) {
            onChangeCategory(id);
        } else {
            updateSelectedButtonStyle(intId);
        }
    }

    function updateSelectedButtonStyle(id) {
        buttons.forEach((button, index) => {
            const isSelected = index === id;
            button.style.backgroundColor = isSelected ? rootStyles.getPropertyValue('--color-surface-brand-alt') : 'transparent';
            button.style.color = isSelected ? rootStyles.getPropertyValue('--color-text-white-default') : rootStyles.getPropertyValue('--color-text-weak');
            progressBars[index].style.width = isSelected ? '100%' : 0;
            progressBars[index].style.backgroundColor = isSelected ? rootStyles.getPropertyValue('--color-surface-brand-default') : 'transparent';

            const categoryCount = button.querySelector('#category-count');
            if (categoryCount) {
                const category = categories[index];
                categoryCount.textContent = `${category.nowIndex}/${category.total}`;
            }
        });
    }

    function createButton(category) {
        const button = document.createElement('button');
        button.className = 'press-category-button';
        button.id = `press-category-${category.id}`;

        const progressBar = document.createElement('div');
        progressBar.className = 'press-category-button-progress';
        progressBar.id = `press-category-progress-${category.id}`;

        const span = document.createElement('span');
        span.id = `press-category-span-${category.id}`;
        span.textContent = category.title;

        button.appendChild(progressBar);
        button.appendChild(span);
        return button;
    }

    function setProgress(selectedButton) {
        const id = separateId(selectedButton.id);
        const progressElement = progressBars[id];

        let progress = 0;
        progressElement.style.transition = 'width 1s ease';

        progressInterval = setInterval(() => {
            if (progress >= 100) {
                clearInterval(progressInterval);
                progressElement.style.transition = 'none';
                progressElement.style.width = 0;
                progressElement.style.backgroundColor = 'transparent';
                autoChangeCategory();
            } else {
                progress += 2;
                progressElement.style.width = `${progress}%`;
                progressElement.style.backgroundColor = rootStyles.getPropertyValue('--color-surface-brand-default');
            }
        }, 100);
    }

    function renderButtons() {
        element.innerHTML = '';
        categories.forEach(category => {
            const button = createButton(category);
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

    function initialize() {
        renderButtons();
        addEventListeners();
        updateSelectedButtonStyle(separateId(selectedId));
    }

    initialize();

    return {
        element
    };
};

export default ProgressCategoryContainer;