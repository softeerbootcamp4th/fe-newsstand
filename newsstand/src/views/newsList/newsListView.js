const CLASS = Object.freeze({
    NEWS_CONTAINER: 'news-container',
    NEWS_CONTENT_CONTAINER: 'news-content-container',
    ARROW_BUTTON: 'arrow-button'
});

const ID = Object.freeze({
    LEFT_ARROW: 'left-arrow',
    RIGHT_ARROW: 'right-arrow'
});

class NewsListView {
    constructor({ onClickArrowButton }) {
        this.element = document.createElement('div');
        this.element.className = CLASS.NEWS_CONTAINER;
        this.onClickArrowButton = onClickArrowButton;
    }

    render(pressCategoryViewElement, pressInfoViewElement, pressNewsViewElement) {
        this.element.innerHTML = `
            <img id="${ID.LEFT_ARROW}" class="${CLASS.ARROW_BUTTON}" src="../../assets/icons/left-arrow-button.svg" alt="left arrow icon">
            <div class="${CLASS.NEWS_CONTENT_CONTAINER}"></div>
            <img id="${ID.RIGHT_ARROW}" class="${CLASS.ARROW_BUTTON}" src="../../assets/icons/right-arrow-button.svg" alt="right arrow icon">
        `;

        const newsContentContainer = this.element.querySelector(`.${CLASS.NEWS_CONTENT_CONTAINER}`);
        newsContentContainer.innerHTML = '';
        newsContentContainer.appendChild(pressCategoryViewElement);
        newsContentContainer.appendChild(pressInfoViewElement);
        newsContentContainer.appendChild(pressNewsViewElement);

        this.addEventListenerToArrowButton();
    }

    addEventListenerToArrowButton() {
        const buttons = this.element.querySelectorAll(`.${CLASS.ARROW_BUTTON}`);
        buttons.forEach(button => {
            button.addEventListener('click', (event) => {
                if (button.id === ID.LEFT_ARROW) {
                    this.onClickArrowButton('prev');
                } else if (event.target.id === ID.RIGHT_ARROW) {
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
