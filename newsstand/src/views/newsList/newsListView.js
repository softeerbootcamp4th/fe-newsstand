class NewsListView {
    constructor({onClickArrowButton}) {
        this.element = document.createElement('div');
        this.element.className = 'news-container';
        this.onClickArrowButton = onClickArrowButton;
    }

    render(pressCategoryViewElement, pressInfoViewElement, pressNewsViewElement) {
        this.element.innerHTML = `
            <img id="left-arrow" class="arrow-button" src="../../assets/icons/left-arrow-button.svg" alt="left arrow icon">
            <div class="news-content-container"></div>
            <img id="right-arrow" class="arrow-button" src="../../assets/icons/right-arrow-button.svg" alt="right arrow icon">
        `;

        const newsContentContainer = this.element.querySelector('.news-content-container');
        newsContentContainer.innerHTML = '';
        newsContentContainer.appendChild(pressCategoryViewElement);
        newsContentContainer.appendChild(pressInfoViewElement);
        newsContentContainer.appendChild(pressNewsViewElement);

        this.addEventListenerToArrowButton();
    }

    addEventListenerToArrowButton() {
        const buttons = this.element.querySelectorAll('.arrow-button');
        buttons.forEach(button => {
            button.addEventListener('click', (event) => {
                if (button.id === "left-arrow") {
                    this.onClickArrowButton('prev');
                } else if (event.target.id === "right-arrow") {
                    this.onClickArrowButton('next');
                }
            });
        });
    }

    update() {

    }

    getElement() {
        return this.element;
    }
}

export default NewsListView;