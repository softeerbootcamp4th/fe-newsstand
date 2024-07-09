import intervalManager from '../../manager/intervalManager.js';
import PressCategoryContainer from './pressCategory/pressCategory.js';
import PressInfoContainer from './pressInfo/pressInfo.js';
import PressNewsContainer from './pressNews/pressNews.js';

export const NewsList = ({ isAllPress, tabs }) => {
    const element = document.createElement('div');
    element.className = 'news-container';

    let selectedCategoryIndex = 0;
    let selectedPressIndex = 0;

    function startTimer() {
        intervalManager.startTimer(() => {
            changeToNextPress();
        }, 20000);
    }

    function render() {
        element.innerHTML = `
            <img id="left-arrow" class="arrow-button" src="../../assets/icons/left-arrow-button.svg" alt="left arrow icon">
            <div class="news-content-container"></div>
            <img id="right-arrow" class="arrow-button" src="../../assets/icons/right-arrow-button.svg" alt="right arrow icon">
        `;

        const newsContentContainer = element.querySelector('.news-content-container');

        const countInfo = isAllPress ? `${selectedPressIndex + 1}/${tabs[selectedCategoryIndex].tabData.length}` : null;
        const pressCategoryContainer = PressCategoryContainer({
            isAllPress: isAllPress,
            tabFields: tabs,
            selectedIndex: selectedCategoryIndex,
            onChangeCategory: handleChangeCategoryByClick,
            countInfo: countInfo
        });

        console.log(tabs, selectedCategoryIndex, selectedPressIndex);
        const pressInfoContainer = PressInfoContainer({
            press: tabs[selectedCategoryIndex].tabData[selectedPressIndex],
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
        startTimer();
    }

    function handleChangeCategoryByClick(index) {
        selectedCategoryIndex = index;
        selectedPressIndex = 0;
        render();
    }

    function changeToNextPress() {
        selectedPressIndex += 1;
        if (selectedPressIndex >= tabs[selectedCategoryIndex].tabData.length) {
            selectedPressIndex = 0;
            changeToNextCategory();
        } else {
            render();
        }
    }

    function changeToPrevPress() {
        selectedPressIndex -= 1;
        if (selectedPressIndex < 0) {
            selectedPressIndex = tabs[selectedCategoryIndex].tabDataCount - 1;
            changeToPrevCategory();
        } else {
            render();
        }
    }

    function changeToNextCategory() {
        selectedCategoryIndex += 1;
        if (selectedCategoryIndex >= tabs.length) {
            selectedCategoryIndex = 0;
        }
        selectedPressIndex = 0;
        render();
    }

    function changeToPrevCategory() {
        selectedCategoryIndex -= 1;
        if (selectedCategoryIndex < 0) {
            selectedCategoryIndex = tabs.length - 1;
        }
        selectedPressIndex = 0;
        render();
    }

    function addEventListenerToArrowButton() {
        const buttons = element.querySelectorAll('.arrow-button');
        buttons.forEach(button => {
            button.addEventListener('click', (event) => {
                if (event.target.id === "left-arrow") {
                    changeToPrevPress();
                } else if (event.target.id === "right-arrow") {
                    changeToNextPress();
                }
            });
        });
    }

    render();

    return {
        element
    };
};

export default NewsList;
