export const PressMenu = ({ onToggleAllPress, onToggleListView }) => {
    let element = document.createElement('div');
    element.className = 'press-menu-container';

    function toggleSubscribeButton(event) {
        const button = event.target;
        button.style.fontWeight = 'bold';

        onToggleAllPress(button.id === 'all-press');
    }

    function toggleListView(event) {
        const button = event.target;
        
        onToggleListView(button.id === 'list-view');
    }

    function render() {
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

        element.innerHTML = html;

        addEventListenerToSubscribeButtons();
        addEventListenerToListButtons();
    }

    function addEventListenerToSubscribeButtons() {
        const subscribeButtons = element.querySelectorAll('.subscribe-menu-button');
        subscribeButtons.forEach(button => {
            button.addEventListener('click', toggleSubscribeButton);
        });
    }

    function addEventListenerToListButtons() {
        const listGridButtons = element.querySelectorAll('.list-grid-button');
        listGridButtons.forEach(button => {
            button.addEventListener('click', toggleListView);
        });
    }

    render();

    return {
        element
    };
};

export default PressMenu;
