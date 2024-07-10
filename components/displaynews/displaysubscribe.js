import { showsubscribe } from "../subscribe/subscribe.js";

//내가 구독한 뉴스기사에 따른  
export const showmysub = (subitem) => {
    document.querySelector('.news-press-img img').src = subitem.pressImg;
    document.querySelector('.news-press-edit').textContent = subitem.edittime;
    document.querySelector('.news-image-container img').src = subitem.mainphoto;
    document.querySelector('.news-title').textContent = subitem.maintitle;
    document.querySelector('.text-button').textContent = subitem.pressName;
    const newsSubTitles = document.querySelectorAll('.news-sub-titles');
    subitem.news.forEach((news, index) => {
        newsSubTitles[index].textContent = news.title;
        newsSubTitles[index].href = news.url;
    });
}

export const shownewstab = (fnews) => {
    console.log(fnews);
    const tabinfos = document.querySelector('.news-list-header');
    tabinfos.innerHTML='';
    
    fnews.forEach(it => {  
        tabinfos.innerHTML += "<article class=\"text-button\">"+it+"</article>";
    });

    // text-button 클래스의 모든 요소 선택
    const tbuttons = document.querySelectorAll('.text-button');
    const hey = fnews[0];
    // 각 버튼에 클릭 이벤트 리스너 추가
    tbuttons.forEach(bbtt => {
        bbtt.addEventListener('click', () => {
            const buttonText = bbtt.textContent; // 버튼의 텍스트 내용 가져오기
            updateSubDisplay(buttonText); // updateSubDisplay 함수 호출
        });
    });
    updateSubDisplay(hey);
} 

//관심 언론 선택하였을 때, 페이지 넘김에 따른 컨텐츠 변화 함수 
export const updateSubDisplay = (pname) => {
    const filtered = window.newsData.filter(item => item.pressName === pname);
    const news1 = filtered[0];
    if (news1) {
        document.querySelector('.news-press-img img').src = news1.pressImg;
        document.querySelector('.news-press-edit').textContent = news1.edittime;
        document.querySelector('.news-image-container img').src = news1.mainphoto;
        document.querySelector('.news-title').textContent = news1.maintitle;
        document.querySelector('.pressedby').textContent = news1.pressName + " 언론사에서 직접 편집한 뉴스입니다.";
        const newsSubTitles = document.querySelectorAll('.news-sub-titles');
        news1.news.forEach((news, index) => {
            newsSubTitles[index].textContent = news.title;
            newsSubTitles[index].href = news.url;
        });
        showsubscribe(news1.pressName);
    }
}