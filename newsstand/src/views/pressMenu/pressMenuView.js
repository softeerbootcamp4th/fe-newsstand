const CLASS = Object.freeze({
    PRESS_MENU_CONTAINER: 'press-menu-container',
    SUBSCRIBE_MENU_CONTAINER: 'subscribe-menu-container',
    SUBSCRIBE_MENU_BUTTON: 'subscribe-menu-button',
    LIST_GRID_BUTTON: 'list-grid-button'
});

const ID = Object.freeze({
    ALL_PRESS: 'all-press',
    SUBSCRIBED_PRESS: 'subscribed-press',
    LIST_VIEW: 'list-view',
    GRID_VIEW: 'grid-view'
});

class PressMenuView {
    constructor({ onClickSubscribeMenu, onClickListMenu }) {
        this.element = document.createElement('div');
        this.element.className = CLASS.PRESS_MENU_CONTAINER;
        this.onClickSubscribeMenu = onClickSubscribeMenu;
        this.onClickListMenu = onClickListMenu;
    }

    render() {
        const html = `
            <div class="${CLASS.SUBSCRIBE_MENU_CONTAINER}">
                <button id="${ID.ALL_PRESS}" class="${CLASS.SUBSCRIBE_MENU_BUTTON}">전체 언론사</button>
                <button id="${ID.SUBSCRIBED_PRESS}" class="${CLASS.SUBSCRIBE_MENU_BUTTON}">내가 구독한 언론사</button>
            </div>
            <div>
                <img id="${ID.LIST_VIEW}" src="../../assets/icons/list-view.svg" alt="list view icon" class="${CLASS.LIST_GRID_BUTTON}">
                <img id="${ID.GRID_VIEW}" src="../../assets/icons/grid-view.svg" alt="grid view icon" class="${CLASS.LIST_GRID_BUTTON}">
            </div>
        `;

        this.element.innerHTML = html;
        this.addEventListenerToSubscribeButtons();
        this.addEventListenerToListButtons();
    }

    addEventListenerToSubscribeButtons() {
        const subscribeButtons = this.element.querySelectorAll(`.${CLASS.SUBSCRIBE_MENU_BUTTON}`);

        subscribeButtons.forEach(button => {
            button.addEventListener('click', (event) => {
                this.onClickSubscribeMenu(event.target.id === ID.ALL_PRESS);
            });
        });
    }

    addEventListenerToListButtons() {
        const listGridButtons = this.element.querySelectorAll(`.${CLASS.LIST_GRID_BUTTON}`);

        listGridButtons.forEach(button => {
            button.addEventListener('click', (event) => {
                this.onClickListMenu(event.target.id === ID.LIST_VIEW);
            });
        });
    }

    getElement() {
        return this.element;
    }
}

export default PressMenuView;
