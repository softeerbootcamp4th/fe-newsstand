
// data는 언론사와 그안의 기사들
export function moveToNextPage(data, currentDom, nextDom) {
    const template = `<div id="mainContentTitle" class="Layout__row alignItems-center gap10"><img class="modeImg" src="./static/assets/images/grid-view.svg" alt="Description of SVG"><span>2023.02.10. 18:24편집</span><img class="modeImg" src="./static/assets/images/subscribeButton.svg" alt="Description of SVG"></div><div id="mainContentArticles" class="Layout__row"><div id="mainContentRepresentiveArticle" class="Layout__column-center"><img src="./static/assets/images/tempImage.svg" alt="Description of SVG"><span class="marginTop16">국민연금의 몽니…현대百 지주사 불발</span></div><div id="mainContentAritcleList"><ui><li>"위스키 사려고 이틀 전부터 줄 섰어요"</li><li>'방시혁 제국'이냐 '카카오 왕국'이냐…K엔터 누가 거머쥘까</li><li>사용후핵연료 저장시설 포화…이대론 7년 뒤 원전 멈춘다</li><li>[단독] 원희룡 "해외건설 근로자 소득공제 월 500만원으로 상향할 것"</li><li>태평양에는 우영우의 고래만 있는게 아니었다 [로비의 그림]</li><li>LG엔솔, 폴란드 자동차산업협회 가입…“유럽서 목소리 키운다”</li></ui><div>서울경제 언론사에서 직접 편집한 뉴스입니다.</div></div></div>`

    nextDom.insertAdjacentHTML('beforeend', template);
    nextDom.classList.add("animationStartNext");
    currentDom.classList.add("animationStartNext");
    setTimeout(() => {
        while (currentDom.firstChild) {
            currentDom.removeChild(currentDom.firstChild);
        }
        while (nextDom.firstChild) {
            nextDom.removeChild(nextDom.firstChild);
        }
        currentDom.insertAdjacentHTML('beforeend', template);
        nextDom.classList.remove("animationStartNext");
        currentDom.classList.remove("animationStartNext");
    }, 999);
}

export function moveToPreviousPage(data, currentDom, previousDom) {
    const template = `<div id="mainContentTitle" class="Layout__row alignItems-center gap10"><img class="modeImg" src="./static/assets/images/grid-view.svg" alt="Description of SVG"><span>2023.02.10. 18:24편집</span><img class="modeImg" src="./static/assets/images/subscribeButton.svg" alt="Description of SVG"></div><div id="mainContentArticles" class="Layout__row"><div id="mainContentRepresentiveArticle" class="Layout__column-center"><img src="./static/assets/images/tempImage.svg" alt="Description of SVG"><span class="marginTop16">국민연금의 몽니…현대百 지주사 불발</span></div><div id="mainContentAritcleList"><ui><li>"위스키 사려고 이틀 전부터 줄 섰어요"</li><li>'방시혁 제국'이냐 '카카오 왕국'이냐…K엔터 누가 거머쥘까</li><li>사용후핵연료 저장시설 포화…이대론 7년 뒤 원전 멈춘다</li><li>[단독] 원희룡 "해외건설 근로자 소득공제 월 500만원으로 상향할 것"</li><li>태평양에는 우영우의 고래만 있는게 아니었다 [로비의 그림]</li><li>LG엔솔, 폴란드 자동차산업협회 가입…“유럽서 목소리 키운다”</li></ui><div>서울경제 언론사에서 직접 편집한 뉴스입니다.</div></div></div>`

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
    }, 999);
}
