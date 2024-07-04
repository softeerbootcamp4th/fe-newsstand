import { createElement } from './createElement.js';
import { render } from './render.js';

const App = () => {
    return createElement('div', { class: 'content-container' },
        createElement('div', { class: 'main-container' },
            createElement('div', { class: 'title-container' },
                createElement('div', {class: 'logo-container'},
                    createElement('img', { src: '../../assets/icons/newspaper.svg', alt: 'newspaper icon' }),
                    createElement('span', { class: 'logo-label'}, '뉴스스탠드')
                ),
                createElement('div', { class: 'day-label'}, '2023. 02. 10. 금요일')
            ),
            createElement('div', { class: 'headline-container' },
                createElement('autoRollingNews', null),
                createElement('autoRollingNews', null),
            ),
            createElement('div', { class: 'menu-container' },
                createElement('div', { class: 'subscribe-menu-container'},
                    createElement('button', { class: 'subscribe-menu-button'}, '전체 언론사'),
                    createElement('button', { class: 'subscribe-menu-button'}, '내가 구독한 언론사')
                ),
                createElement('div', null,
                    createElement('img', { src: '../../assets/icons/list-view.svg', alt: 'list view icon'}),
                    createElement('img', { src: '../../assets/icons/grid-view.svg', alt: 'grid view icon'})
                )
            ),
            createElement('newsList', null)
        )
    );
};

render(App(), document.getElementById('app'));