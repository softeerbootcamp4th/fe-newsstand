import { showsubscribe } from "../subscribe/subscribe.js";
import stateManager from "../statemanager/stateManager.js";
//내가 구독한 뉴스기사에 따른  
export const showmysub = (subscribedItem) => {
    clearInterval(subProgressTimer);
    if (!subscribedItem) {
        console.error('구독한 언론사가 없습니다.');
        return;
    }
    document.querySelector('.news-press-img img').src = subscribedItem.pressImg || '';
    document.querySelector('.news-press-edit').textContent = subscribedItem.edittime || '';
    document.querySelector('.news-image-container img').src = subscribedItem.mainphoto || '';
    document.querySelector('.news-title').textContent = subscribedItem.maintitle || '';
    document.querySelector('.text-button').textContent = subscribedItem.pressName || '';
    const newsSubTitles = document.querySelectorAll('.news-sub-titles');
    subscribedItem.news.forEach((news, index) => {
        newsSubTitles[index].textContent = news.title || '';
        newsSubTitles[index].href = news.url || '';
    });
}

export let subProgressTimer;
let subsindex = 0;

var subscribedNews;
//로컬 스토리지에 있는 아이템들에 대한 렌더링
export const shownewstab = (news) => {
    if (!news || !Array.isArray(news)) {
        console.error('구독한 언론사가 없습니다.');
        return;
    }
    const tabinfos = document.querySelector('.news-list-header');
    tabinfos.innerHTML = '';

    news.forEach(it => {
        tabinfos.innerHTML += `<article class="text-button">${it}</article>`;
    });

    subscribedNews = document.querySelectorAll('.text-button');

    subscribedNews.forEach((subs, index) => {
        subs.addEventListener('click', () => {
            subsindex = index;
            updateTab(subsindex);
        });
    });
    
    updateTab(subsindex);
    clearInterval(subProgressTimer);

    subProgressTimer = setInterval(() => {
        subsindex = (subsindex + 1) % subscribedNews.length;
        updateTab(subsindex);
    }, 2000);
};

const updateTab = (index) => {
    subscribedNews.forEach((btn, idx) => {
        if (idx === index) {
            
            // 애니메이션 초기화 후 다시 추가
            btn.classList.remove('animate');
            void btn.offsetWidth;  // Reflow를 발생시켜 애니메이션 재시작
            btn.classList.add('subprogress-button', 'animate');

            // 이미지 추가
            if (!btn.querySelector('img')) {
                const img = document.createElement('img');
                img.src = '../../icons/chevron-right.svg';
                img.alt = 'Icon';
                btn.appendChild(img);
            }
            
        } else {
            btn.classList.remove('subprogress-button', 'animate');
            const img = btn.querySelector('img');
            if (img) {
                btn.removeChild(img);
            }
        }
    });
    if (subscribedNews){
        const buttonText = subscribedNews[index]?.textContent;
        stateManager.setClickedNews(buttonText);
        updateSubDisplay(buttonText);
    }
};

//관심 언론사 선택하였을 때, 페이지 넘김에 따른 화면 보여줌
export const updateSubDisplay = (press) => {
    const [selectedPress] = stateManager.getAllNews().filter(item => item.pressName === press);    
    if (selectedPress) {
        document.querySelector('.news-press-img img').src = selectedPress.pressImg;
        document.querySelector('.news-press-edit').textContent = selectedPress.edittime;
        document.querySelector('.news-image-container img').src = selectedPress.mainphoto;
        document.querySelector('.news-title').textContent = selectedPress.maintitle;
        document.querySelector('.pressedby').textContent = selectedPress.pressName + " 언론사에서 직접 편집한 뉴스입니다.";
        const newsSubTitles = document.querySelectorAll('.news-sub-titles');
        selectedPress.news.forEach((news, index) => {
            newsSubTitles[index].textContent = news.title;
            newsSubTitles[index].href = news.url;
        });
        showsubscribe(selectedPress.pressName);
    }
    else{
        document.querySelector('.news-press-img img').src = '';
        document.querySelector('.news-press-edit').textContent = '';
        document.querySelector('.news-image-container img').src = '';
        document.querySelector('.news-title').textContent = '';
        document.querySelector('.pressedby').textContent = ``;
        const newsSubTitles = document.querySelectorAll('.news-sub-titles');
        newsSubTitles.forEach((_, index) => {
            if (newsSubTitles[index]) {
                newsSubTitles[index].textContent =  '';
                newsSubTitles[index].href = '#';
            }
        });
        /*
        alert("구독한 언론사가 없습니다.");
        clickArt('all-article');
        originaltabs();
        initmain(); */
    }
}