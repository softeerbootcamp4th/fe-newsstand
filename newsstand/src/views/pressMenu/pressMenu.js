
export const PressMenu = () => {
    let element = document.createElement('div');
    element.className = 'press-menu-container';

    function render() {
        const html = `
        <div class="subscribe-menu-container">
            <button class="subscribe-menu-button">전체 언론사</button>
            <button class="subscribe-menu-button">내가 구독한 언론사</button>
        </div>
        <div>
            <img src="../../assets/icons/list-view.svg" alt="list view icon">
            <img src="../../assets/icons/grid-view.svg" alt="grid view icon">
        </div>
    `;

    element.innerHTML = html;
    }

    render();

    return {
        element
    };
};

export default PressMenu;
