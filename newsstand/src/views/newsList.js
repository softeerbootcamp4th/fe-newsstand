// NewsList 컴포넌트
export const NewsList = (props) => {
    let element = document.createElement('div');
    element.className = 'news-container';
    
    let selectedId = 'news-category-0';
    let progressInterval;
    const rootStyles = getComputedStyle(document.documentElement);

    function autoChangeCategory() {
        const currentId = parseInt(selectedId.split('-')[2]);
        const nextId = (currentId + 1) % 6;

        selectedId = `news-category-${nextId}`;
        const selectedButton = element.querySelector(`#${selectedId}`);
    
        changeStyle(selectedButton);
    }   

    function autoChangePress() {
        selectedId = `news-category-${selectedId}`;
        const selectedButton = element.querySelector(`#${selectedId}`);

        changeStyle(selectedButton)
    }

    function autoChangeCategory() {
        const currentId = parseInt(selectedId.split('-')[2]);
        const nextId = (currentId + 1) % 6;

        selectedId = `news-category-${nextId}`;
        const selectedButton = element.querySelector(`#${selectedId}`);
    
        changeStyle(selectedButton);
    }   

    function onClickEvent(event) {
        selectedId = event.target.id;
        const selectedButton = element.querySelector(`#${selectedId}`);
        changeStyle(selectedButton);
    }

    function changeStyle(selectedButton) {
        const buttons = element.querySelectorAll('.news-category-button');
        const progressButtons = element.querySelectorAll('.news-category-button-progress');
        const categoryCount = element.querySelector(`#category-count`);

        if (categoryCount) {
            categoryCount.remove();
        }

        buttons.forEach((button, index) => {
            progressButtons[index].style.width = 0;
            progressButtons[index].style.backgroundColor = 'transparent';
            button.style.backgroundColor = 'transparent'; 
            button.style.color = rootStyles.getPropertyValue('--color-text-weak');
        });

        selectedButton.style.backgroundColor = rootStyles.getPropertyValue('--color-surface-brand-alt');
        selectedButton.style.color = rootStyles.getPropertyValue('--color-text-white-default');

        setProgress(selectedButton)
        addCountElement(selectedButton)
    }

    function addCountElement(selectedButton) {
        const spanElement = document.createElement('span');
        spanElement.id = "category-count"
        spanElement.textContent = ' 1/81 ';
        
        selectedButton.appendChild(spanElement);
        selectedButton.style.width = 'max-content'
    }

    function setProgress(selectedButton) {
        if (progressInterval) {
            clearInterval(progressInterval);
        }

        const progressElement = selectedButton.querySelector('.news-category-button-progress');
        
        if (progressElement) {
            let progress = 0;
            progressInterval = setInterval(() => {
                progress += 1;
                progressElement.style.width = `${progress}%`;
                progressElement.style.backgroundColor = rootStyles.getPropertyValue('--color-surface-brand-default');
                
                if (progress >= 100) {
                    progressElement.style.width = 0;
                    progressElement.style.backgroundColor = 'transparent';
                    clearInterval(progressInterval);
                }
            }, 200);
        }
    }

    function render() {
        const html = `
            <img src="../../assets/icons/left-arrow-button.svg" alt="left arrow icon">
            <div class="news-content-container">
                <div class="news-category-container">
                    <button class="news-category-button" id="news-category-0"}>
                        <div class="news-category-button-progress" id="news-category-0"></div>
                        <span id="news-category-0">종합/경제</span>
                    </button>
                    <button class="news-category-button" id="news-category-1">
                        <div class="news-category-button-progress" id="news-category-1"></div>
                        <span id="news-category-1">방송/통신</span>
                    </button>
                    <button class="news-category-button" id="news-category-2">
                        <div class="news-category-button-progress id="news-category-2"></div>
                        <span id="news-category-2">영자지</span>
                    </button>
                    <button class="news-category-button" id="news-category-3">
                        <div class="news-category-button-progress" id="news-category-3"></div>
                        <span id="news-category-3">스포츠/연예</span>
                    </button>
                    <button class="news-category-button" id="news-category-4">
                        <div class="news-category-button-progress" id="news-category-4"></div>
                        <span id="news-category-4">매거진/전문지</span>
                    </button>
                    <button class="news-category-button" id="news-category-5">
                        <div class="news-category-button-progress" id="news-category-5"></div>
                        <span id="news-category-5">지역</span>
                    </button>
                </div>
            </div>
            <img src="../../assets/icons/right-arrow-button.svg" alt="right arrow icon">
        `;
        
        element.innerHTML = html;

        const buttons = element.querySelectorAll('.news-category-button');
        buttons.forEach(button => {
            button.addEventListener('click', onClickEvent);
        });

        const initiallySelectedButton = element.querySelector(`#${selectedId}`);
        if (initiallySelectedButton) {
            changeStyle(initiallySelectedButton)
        }
    }

    render();

    setInterval(autoChangeCategory, 20000);

    return {
        element
    };
}

export default NewsList;
