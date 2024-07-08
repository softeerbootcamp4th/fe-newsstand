import { separateId } from "../../../utils/utils.js";

const ProgressCategoryContainer = ({ 
    tabs, 
    timerIntervalRef,  // Use a ref to manage the timer interval
    selectedId: initialSelectedId, 
    selectedPressIndex: initialSelectedPressIndex, 
    onChangeCategory, 
    onChangePress 
    }) => {

    const element = document.createElement('div');
    element.className = 'press-category-container';

    let buttons = [];
    let progressBars = [];
    let selectedPressIndex = initialSelectedPressIndex;
    let selectedId = initialSelectedId;

    function autoChangeCategory() {
        console.log('auto');
        const currentIndex = separateId(selectedId);
        const currentCategory = tabs[currentIndex];

        if (selectedPressIndex < currentCategory.tabDataCount - 1) {
            selectedPressIndex += 1;
            onChangePress(selectedPressIndex);
        } else {
            const nextId = (currentIndex + 1) % tabs.length;
            const newSelectedId = `press-category-${nextId}`;
            onChangeCategory(newSelectedId);
            onChangePress(0);
        }

        updateSelectedButtonStyle(currentIndex);
    }

    function onClickEvent(event) {
        setTimer();

        const intId = separateId(event.target.id);
        const id = `press-category-${intId}`;

        if (id !== selectedId) {
            onChangeCategory(id);
            onChangePress(0);
        } else {
            updateSelectedButtonStyle(intId);
        }
    }

    function updateSelectedButtonStyle(id) {
        const rootStyles = getComputedStyle(document.documentElement);

        buttons.forEach((button, index) => {
            const isSelected = index === id;

            button.style.backgroundColor = isSelected ? rootStyles.getPropertyValue('--color-surface-brand-alt') : 'transparent';
            button.style.color = isSelected ? rootStyles.getPropertyValue('--color-text-white-default') : rootStyles.getPropertyValue('--color-text-weak');

            const categoryCountSpan = button.querySelector('.press-count-span');
            if (categoryCountSpan) {
                button.style.width = isSelected ? "166px" : "max-content";
                categoryCountSpan.textContent = isSelected ? `${selectedPressIndex + 1}/${tabs[index].tabDataCount}` : "";
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

    function setTimer() {
        if (timerIntervalRef.current) {
            console.log("clearTimer", timerIntervalRef.current);
            clearInterval(timerIntervalRef.current);
        }
        timerIntervalRef.current = setInterval(autoChangeCategory, 20000);
        console.log("settimer:", timerIntervalRef.current);
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
        updateSelectedButtonStyle(separateId(selectedId));
    }

    render();
    setTimer();

    return {
        element,
        setTimer
    };
};

export default ProgressCategoryContainer;