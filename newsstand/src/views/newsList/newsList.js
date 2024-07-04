import PressCategoryContainer from './pressCategory/pressCategory.js';
import PressInfoContainer from './pressInfo/pressInfo.js';
import PressNewsContainer from './pressNews/pressNews.js';

export const NewsList = (props) => {
    let element = document.createElement('div');
    element.className = 'news-container';

    let selectedId = 'press-category-0';

    function handleChangeCategory(newSelectedId) {
        selectedId = newSelectedId;
        render();
    }

    function render() {
        const html = `
            <img src="../../assets/icons/left-arrow-button.svg" alt="left arrow icon">
            <div class="news-content-container"></div>
            <img src="../../assets/icons/right-arrow-button.svg" alt="right arrow icon">
        `;
        
        element.innerHTML = html;

        const newsContentContainer = element.querySelector('.news-content-container');

        const newsCategoryContainer = PressCategoryContainer({
            selectedId, 
            onChangeCategory: handleChangeCategory
        });

        const pressInfoContainer = PressInfoContainer({ 
            imageSrc: "", 
            editTime: "2023.02.10. 18:57 편집" 
        });

        const pressNewsContainer = PressNewsContainer({ 
            mainNews: {
                imageSrc: "https://wimg.mk.co.kr/news/cms/202407/04/news-p.v1.20240704.0b9bafd4ae364e1a8827d570d63bbf41_P1.jpg", 
                title: "대통령실, 도이치모터스 1심 판결에 '김 여사 연루 의혹, 민주당 주장 깨졌다'"
            },
            listNews: [
                { title: "이재명 '공개소환, 회술레같은 수치'…검찰 '비공개 출석 요구하지도 않았다'" },
                { title: "이재명 '공개소환, 회술레같은 수치'…검찰 '비공개 출석 요구하지도 않았다'" },
                { title: "이재명 '공개소환, 회술레같은 수치'…검찰 '비공개 출석 요구하지도 않았다'" },
                { title: "이재명 '공개소환, 회술레같은 수치'…검찰 '비공개 출석 요구하지도 않았다'" },
                { title: "이재명 '공개소환, 회술레같은 수치'…검찰 '비공개 출석 요구하지도 않았다'" },
                { title: "이재명 '공개소환, 회술레같은 수치'…검찰 '비공개 출석 요구하지도 않았다'" }
            ]
        });

        newsContentContainer.appendChild(newsCategoryContainer.element);
        newsContentContainer.appendChild(pressInfoContainer.element);
        newsContentContainer.appendChild(pressNewsContainer.element);
    }

    render();

    return {
        element
    };
}

export default NewsList;
