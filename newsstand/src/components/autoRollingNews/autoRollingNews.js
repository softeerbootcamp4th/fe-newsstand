export const AutoRollingNews = (props) => {
    let element = document.createElement('div');
    element.className = 'autoRollingNews';

    function render() {
        const html = `
        <p class="autoRollingNews-company">연합뉴스</p>
        <button class="autoRollingNews-title">[1보] 김기현·안철수·천하람·황교안, 與전대 본경선 진출</button>
        `;
        element.innerHTML = html;
    }

    render();

    function updateProps(newProps) {
        props = newProps;
        render();
    }

    return {
        element,
        updateProps
    };
}

export default AutoRollingNews;