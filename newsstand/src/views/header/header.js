export const Header = () => {
    let element = document.createElement('div');
    element.className = 'header-container';

    function render() {
        const html = `
        <div class="logo-container">
            <img src="../../assets/icons/newspaper.svg" alt="newspaper icon">
            <span class="logo-label">뉴스스탠드</span>
        </div>
        <div class="day-label">2023. 02. 10. 금요일</div>
    `;

    element.innerHTML = html;
    }

    render();

    return {
        element
    };
};

export default Header;
