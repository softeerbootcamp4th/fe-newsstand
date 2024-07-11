class PressMenuView {
    constructor() {
        this.element = document.createElement('div');
        this.element.className = 'press-menu-container';
    }

    render() {
        const html = `
            <div class="subscribe-menu-container">
                <button id="all-press" class="subscribe-menu-button">전체 언론사</button>
                <button id="subscribed-press" class="subscribe-menu-button">내가 구독한 언론사</button>
            </div>
            <div>
                <img id="list-view" src="../../assets/icons/list-view.svg" alt="list view icon" class="list-grid-button">
                <img id="grid-view" src="../../assets/icons/grid-view.svg" alt="grid view icon" class="list-grid-button">
            </div>
        `;

        this.element.innerHTML = html;
    }

    addEventListenerToSubscribeButtons(callback) {
        const subscribeButtons = this.element.querySelectorAll('.subscribe-menu-button');

        subscribeButtons.forEach(button => {
            button.addEventListener('click', (event) => {
                callback(event.target.id === 'all-press');
            });
        });
    }

    addEventListenerToListButtons(callback) {
        const listGridButtons = this.element.querySelectorAll('.list-grid-button');
        
        listGridButtons.forEach(button => {
            button.addEventListener('click', (event) => {
                callback(event.target.id === 'list-view');
            });
        });
    }

    getElement() {
        return this.element;
    }
}

export default PressMenuView;