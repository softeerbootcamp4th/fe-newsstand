// render.js

export const render = (component, container) => {
    // container 요소를 비우고 새로운 컴포넌트를 렌더링합니다.
    container.innerHTML = '';
    container.appendChild(component);
};
