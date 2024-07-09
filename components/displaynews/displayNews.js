import { showsubscribe } from "../subscribe/subscribe.js";
//받아온 뉴스 정보 - 전역변수
window.newsData = [];
//import handlefilters from "../mainscript.js";
import { transformToProgress } from "../testing/progressbutton.js";
import { currentIndex } from "../mainscript.js";
let testingpages = [];
window.maxpage = 100;

window.onload = async () => {
    try {
        const response = await fetch('../../news/allnews.json');
        const data = await response.json();
        console.log(data);
        window.newsData = data;
        const buttons = document.querySelectorAll('.text-button');
        buttons.forEach(button => {
            button.addEventListener('click', () => {
                updateNewsDisplay(button.id, 0);
                //handlefilters();
                console.log("===");
                console.log(window.maxpage);
                console.log("====");
            });
            // 클릭된 탭의 위치(offsetTop)를 계산
            const offsetTop = button.offsetTop;

            // 스크롤 애니메이션을 추가하여 해당 위치로 스크롤
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        });
        //초기에는 경제기사를 디폴트 값으로 한다.
        updateNewsDisplay("economy", 0);
        const ts = document.querySelector(".text-button");
        transformToProgress(ts);
    } catch (error) {
        console.error('Error loading JSON:', error);
    }
    
}; 

//뉴스 종류를 선택하였을 때, 페이지 넘김에 따른 컨텐츠 변화 함수 
export const updateNewsDisplay = (pressType, idx)  =>{
    const filteredNews = window.newsData.filter(item => item.pressType === pressType);
    const newsItem = filteredNews.find(item => item.pid == idx);
    window.maxpage = filteredNews.length;
    console.log(window.maxpage);
    //currentIndex = 0;
    if (newsItem) {
        window.btntext = newsItem.pressName;
        document.querySelector('.news-press-img img').src = newsItem.pressImg;
        document.querySelector('.news-press-edit').textContent = newsItem.edittime;
        document.querySelector('.news-image-container img').src = newsItem.mainphoto;
        document.querySelector('.news-title').textContent = newsItem.maintitle;
        document.querySelector('.pressedby').textContent = newsItem.pressName + " 언론사에서 직접 편집한 뉴스입니다.";
        const newsSubTitles = document.querySelectorAll('.news-sub-titles');
        newsItem.news.forEach((news, index) => {
            newsSubTitles[index].textContent = news.title;
            newsSubTitles[index].href = news.url;
        });
        showsubscribe(newsItem.pressName);
    }
}
