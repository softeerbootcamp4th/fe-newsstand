export const ProgressCategoryContainer = ({ selectedId: initialSelectedId, onChangeCategory }) => {
    let element = document.createElement('div');
    element.className = 'press-category-container';
    let buttons = [];
    let progressButtons = [];
    let selectedId = initialSelectedId;
    let progressInterval;

    const rootStyles = getComputedStyle(document.documentElement);
    const categories = [
        { id: 0, title: "종합/경제", nowIndex: 1, total: 4 },
        { id: 1, title: "방송/통신", nowIndex: 1, total: 4 },
        { id: 2, title: "IT", nowIndex: 1, total: 4 },
        { id: 3, title: "영자지", nowIndex: 1, total: 4 },
        { id: 4, title: "스포츠/연예", nowIndex: 1, total: 4 },
        { id: 5, title: "매거진/전문지", nowIndex: 1, total: 4 },
        { id: 6, title: "지역", nowIndex: 1, total: 4 }
    ];

    function separateId(id) {
        const parts = id.split('-');
        const lastPart = parts[parts.length - 1];
        return parseInt(lastPart);
    }

    function clearCurrentInterval() {
        if (progressInterval) {
            clearInterval(progressInterval);
        }
    }

    function autoChangeCategory() {
        const currentId = separateId(selectedId);

        if (categories[currentId].nowIndex < categories[currentId].total) {
            categories[currentId].nowIndex += 1;
            updateSelectedButtonStyle(buttons[currentId]);
        } else {
            const nextId = (currentId + 1) % categories.length;
            const newSelectedId = `press-category-${nextId}`;
            onChangeCategory(newSelectedId);
        }
    }

    function onClickEvent(event) {
        clearCurrentInterval();
        const intId = separateId(event.target.id);
        const id = `press-category-${intId}}`;
        if (id !== selectedId) {
            onChangeCategory(id);
        } else {
            updateSelectedButtonStyle(buttons[intId]);
        }
    }

    function updateSelectedButtonStyle(selectedButton) {
        const id = separateId(selectedButton.id)
        const categoryCount = selectedButton.querySelector(`#category-count`);

        if (categoryCount) {
            categoryCount.textContent = `${categories[id].nowIndex}/${categories[id].total}`;
        } else {
            addCountElement(selectedButton);
        }

        buttons.forEach((button, index) => {
            progressButtons[index].style.width = 0;
            progressButtons[index].style.backgroundColor = 'transparent';
            button.style.backgroundColor = 'transparent';
            button.style.color = rootStyles.getPropertyValue('--color-text-weak');
        });

        selectedButton.style.backgroundColor = rootStyles.getPropertyValue('--color-surface-brand-alt');
        selectedButton.style.color = rootStyles.getPropertyValue('--color-text-white-default');
        setProgress(selectedButton);
    }

    function addCountElement(selectedButton) {
        const spanElement = document.createElement('span');
        spanElement.id = "category-count";
        let id = separateId(selectedButton.id)
        spanElement.textContent = `${categories[id].nowIndex}/${categories[id].total}`;
        selectedButton.appendChild(spanElement);
        selectedButton.style.width = 'max-content';
    }

    function setProgress(selectedButton) {
        clearCurrentInterval();
        const progressElement = progressButtons[separateId(selectedButton.id)];
        
        if (progressElement) {
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
            }, 400);
        }
    }
    

    function render() {
        const html = categories.map(category => `
            <button class="press-category-button" id="press-category-${category.id}">
                <div class="press-category-button-progress" id="press-category-progress-${category.id}"></div>
                <span id="press-category-span-${category.id}">${category.title}</span>
            </button>
        `).join('');
        element.innerHTML = html;
        buttons = Array.from(element.querySelectorAll('.press-category-button'));
        progressButtons = Array.from(element.querySelectorAll('.press-category-button-progress'));
        buttons.forEach(button => {
            button.addEventListener('click', onClickEvent);
        });
        const initiallySelectedButton = buttons[separateId(selectedId)];
        if (initiallySelectedButton) {
            updateSelectedButtonStyle(initiallySelectedButton);
        }
    }

    function updateSelectedId(newSelectedId) {
        if (newSelectedId !== selectedId) {
            selectedId = newSelectedId;
            const selectedButton = buttons[separateId(selectedId)];
            if (selectedButton) {
                updateSelectedButtonStyle(selectedButton);
            }
        }
    }

    render();

    return {
        element,
        updateSelectedId
    };
}
export default ProgressCategoryContainer;