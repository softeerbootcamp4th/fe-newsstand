import { showSubscribeAlert } from "../alert/alert.js";

// data는 언론사와 그안의 기사들
export function moveToNextPage(data, currentDom, nextDom, index, subscribeAction = () => { }) {
    const currentData = data[index];
    // 더미를 활용한 template literal
    console.log(currentData.mediaCompanyImageURL);
    const template = `<div id="mainContentTitle" class="Layout__row alignItems-center gap10"><img src="${currentData.mediaCompanyImageURL}" style="width: 52.5px; height:20px;" alt="img"><span>${currentData.lastDate}편집</span><img class="subScribeButton" src="./static/assets/images/${currentData.isSubscribe ? "Button.svg" : "subscribeButton.svg"}" alt="Description of SVG"></div><div id="mainContentArticles" class="Layout__row"><div id="mainContentRepresentiveArticle" class="Layout__column-center"><img src="${currentData.articles[0].imageURL}" alt="Description of SVG" style="width: 320px; height: 200px"><span class="marginTop16">${currentData.articles[0].articleTitle}</span></div><div id="mainContentAritcleList"><ui><li>${currentData.articles[1].articleTitle}</li><li>${currentData.articles[2].articleTitle}</li><li>${currentData.articles[3].articleTitle}</li><li>${currentData.articles[4].articleTitle}</li><li>${currentData.articles[5].articleTitle}</li><li>${currentData.articles[6].articleTitle}</li></ui><div>${currentData.name} 언론사에서 직접 편집한 뉴스입니다.</div></div></div>`

    // 비어져있는 다음 element에 주입
    // dom이라는 변수명을 잘 안사용한다는걸 지금봤습니다. 내일 수정하겠습니다.
    nextDom.insertAdjacentHTML('beforeend', template);
    // 애니메이션 시작을 위한 class추가
    nextDom.classList.add("animationStartNext");
    currentDom.classList.add("animationStartNext");
    setTimeout(() => {
        // 애니메이션이 끝난 시점
        // 현재 밀려나간 element에 존재하는 모든 child element 삭제
        while (currentDom.firstChild) {
            currentDom.removeChild(currentDom.firstChild);
        }
        // 현재 밀려들어온 element에 존재하는 모든 child element 삭제
        while (nextDom.firstChild) {
            nextDom.removeChild(nextDom.firstChild);
        }
        // 이번에 들어와야할 template literal 다시 주입
        currentDom.insertAdjacentHTML('beforeend', template);
        // 애니메이션 종료로 element들을 원래 위치로 변경
        nextDom.classList.remove("animationStartNext");
        currentDom.classList.remove("animationStartNext");
        document.querySelector(".subScribeButton").addEventListener('click', () => {
            showSubscribeAlert(() => { })
            subscribeAction();
        })
    }, 1000);
}

export function moveToPreviousPage(data, currentDom, previousDom, index, subscribeAction = () => { }) {
    const currentData = data[index];
    const template = `<div id="mainContentTitle" class="Layout__row alignItems-center gap10"><img src="${currentData.mediaCompanyImageURL}" style="width: 52.5px; height:20px;" alt="img"><span>${currentData.lastDate}편집</span><img class="subScribeButton" src="./static/assets/images/${currentData.isSubscribe ? "Button.svg" : "subscribeButton.svg"}" alt="Description of SVG"></div><div id="mainContentArticles" class="Layout__row"><div id="mainContentRepresentiveArticle" class="Layout__column-center"><img src="${currentData.articles[0].imageURL}" alt="Description of SVG" style="width: 320px; height: 200px"><span class="marginTop16">${currentData.articles[0].articleTitle}</span></div><div id="mainContentAritcleList"><ui><li>${currentData.articles[1].articleTitle}</li><li>${currentData.articles[2].articleTitle}</li><li>${currentData.articles[3].articleTitle}</li><li>${currentData.articles[4].articleTitle}</li><li>${currentData.articles[5].articleTitle}</li><li>${currentData.articles[6].articleTitle}</li></ui><div>${currentData.name} 언론사에서 직접 편집한 뉴스입니다.</div></div></div>`

    previousDom.insertAdjacentHTML('beforeend', template);
    previousDom.classList.add("animationStartPrevious");
    currentDom.classList.add("animationStartPrevious");
    setTimeout(() => {
        while (currentDom.firstChild) {
            currentDom.removeChild(currentDom.firstChild);
        }
        while (previousDom.firstChild) {
            previousDom.removeChild(previousDom.firstChild);
        }
        currentDom.insertAdjacentHTML('beforeend', template);
        previousDom.classList.remove("animationStartPrevious");
        currentDom.classList.remove("animationStartPrevious");
        document.querySelector(".subScribeButton").addEventListener('click', () => {
            showSubscribeAlert(() => { })
            subscribeAction();
        })
    }, 1000);
}
