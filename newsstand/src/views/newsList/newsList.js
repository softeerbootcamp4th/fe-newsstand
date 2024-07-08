import PressCategoryContainer from './pressCategory/pressCategory.js';
import PressInfoContainer from './pressInfo/pressInfo.js';
import PressNewsContainer from './pressNews/pressNews.js';

import { separateId } from '../../utils/utils.js';

export const NewsList = (props) => {
    let element = document.createElement('div');
    element.className = 'news-container';

    const { tabs } = props;

    let selectedCategoryIndex = 0;
    let selectedPressIndex = 0;
    let lastSelectedCategoryIndex = null;

    let pressCategoryContainer;

    function render() {
        const html = `
            <img id="left-arrow" class="arrow-button" src="../../assets/icons/left-arrow-button.svg" alt="left arrow icon">
            <div class="news-content-container"></div>
            <img id="right-arrow" class="arrow-button" src="../../assets/icons/right-arrow-button.svg" alt="right arrow icon">
        `;

        element.innerHTML = html;

        const newsContentContainer = element.querySelector('.news-content-container');

        if (!pressCategoryContainer || lastSelectedCategoryIndex !== selectedCategoryIndex) {
            pressCategoryContainer = PressCategoryContainer({
                tabs,
                selectedId: `press-category-${selectedCategoryIndex}`,
                onChangeCategory: handleChangeCategory
            });
        }

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

        newsContentContainer.innerHTML = '';
        newsContentContainer.appendChild(pressCategoryContainer.element);
        newsContentContainer.appendChild(pressInfoContainer.element);
        newsContentContainer.appendChild(pressNewsContainer.element);


        addEventListenerToArrowButton();

        lastSelectedCategoryIndex = selectedCategoryIndex;
    }

    function handleChangeCategory(newSelectedId) {
        console.log(selectedCategoryIndex);
        console.log(newSelectedId);
        if (newSelectedId !== `press-category-${selectedCategoryIndex}`) {
            selectedCategoryIndex = separateId(newSelectedId);
            console.log(selectedCategoryIndex);
            render();
        }
    }

    function addEventListenerToArrowButton() {
        const buttons = element.querySelectorAll('.arrow-button');

        buttons.forEach(button => {
            button.addEventListener('click', changePressCategory);
        });
    }

    function changePressCategory(event) {
        switch (event.target.id) {
            case "left-arrow":
                changeToPrevPress();
                break;
            case "right-arrow":
                changeToNextPress();
                break;
            default:
                break;
        }
    }

    function changeToNextCategory() {
        selectedCategoryIndex += 1;

        if (selectedCategoryIndex >= tabs.length) {
            selectedCategoryIndex = 0;
        }

        console.log(selectedCategoryIndex);

        render();
    }

    function changeToPrevCategory() {
        selectedCategoryIndex -= 1;

        if (selectedCategoryIndex < 0) {
            selectedCategoryIndex = tabs.length - 1;
        }

        console.log(selectedCategoryIndex);
        render();
    }

    function changeToNextPress() {
        selectedPressIndex += 1;

        if (selectedPressIndex > 3) {
            selectedPressIndex = 0;
            changeToNextCategory();
        }
    }

    function changeToPrevPress() {
        console.log("press prev");
        selectedPressIndex -= 1;

        if (selectedPressIndex < 0) {
            selectedPressIndex = 0;
            changeToPrevCategory();
        }
    }

    render();

    return {
        element
    };
};

export default NewsList;