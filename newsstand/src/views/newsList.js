import { createElement } from '../app/createElement.js';
import { render } from '../app/render.js';
// import { render } from './render.js';


export const NewsList = () => {
    return createElement('div', { class: 'news-container' },
        createElement('img', { src: '../../assets/icons/left-arrow-button.svg', alt: 'left arrow icon'}),
        createElement('div', { class: 'news-content-container'},
            createElement('div', { class: 'news-category-container'},
           createElement('categoryButton', {id: 0}, '종합/경제'),
           createElement('categoryButton', {id: 1}, '방송/통신'),
           createElement('categoryButton', {id: 2}, '영자지'),
           createElement('categoryButton', {id: 3}, '스포츠/연예'),
           createElement('categoryButton', {id: 4}, '매거진/전문지'),
           createElement('categoryButton', {id: 5}, '지역'),
            )
        ),

        createElement('img', { src: '../../assets/icons/right-arrow-button.svg', alt: 'right arrow icon'})
    )
};

// render(NewsList(), document.getElementById('app'));