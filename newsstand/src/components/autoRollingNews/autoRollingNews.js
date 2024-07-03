import { createElement } from '../../app/createElement.js';

export const AutoRollingNews = () => {
    return createElement('div', { class: 'autoRollingNews' },
        createElement('p', { class: 'autoRollingNews-company' }, '연합뉴스'),
        createElement('button', { class: 'autoRollingNews-title' }, '[1보] 김기현·안철수·천하람·황교안, 與전대 본경선 진출')
    );
};

export default AutoRollingNews;