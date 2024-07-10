import { showsubscribe } from "../subscribe/subscribe.js";

//내가 구독한 뉴스기사에 따른  
export const showmysub = (subitem) => {
    clearInterval(subProgressTimer);
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

export let subProgressTimer;
//currentIndex 전역변수와 구별 (구독만을 위한 변수)
let subsindex = 0;

//전체 구독 데이터를 가지고 보여주는 함수 - 애니메이션 o
/*
export const shownewstab = (fnews) => {
    console.log(fnews);
    const tabinfos = document.querySelector('.news-list-header');
    tabinfos.innerHTML = '';

    fnews.forEach(it => {  
        tabinfos.innerHTML += "<article class=\"text-button\">" + it + "</article>";
    });

    const tbuttons = document.querySelectorAll('.text-button');

    const updateTab = (index) => {
        tbuttons.forEach((btn, idx) => {
            if (idx === index) {
                btn.classList.add('subprogress-button','animate');
                const img = document.createElement('img');
                img.src = '../../icons/chevron-right.svg'; 
                img.alt = 'Icon'; 
                btn.appendChild(img);
            } else {
                btn.classList.remove('subprogress-button','animate');
                // 버튼에서 이미지 제거
                const img = btn.querySelector('img');
                if (img) {
                    btn.removeChild(img);
                }
            }
        });

        const buttonText = tbuttons[index].textContent;
        console.log(buttonText);
        window.btntext = buttonText;
        updateSubDisplay(buttonText);
    };
    

    tbuttons.forEach((bbtt, index) => {
        bbtt.addEventListener('click', () => {
            subsindex = index;
            updateTab(subsindex);
        });
    });

    updateTab(subsindex);

    clearInterval(subProgressTimer);
    subProgressTimer = setInterval(() => {
        subsindex = (subsindex + 1) % tbuttons.length;
        updateTab(subsindex);
    }, 2000);
};
*/

export const shownewstab = (fnews) => {
    //clearInterval(subProgressTimer);
    console.log(fnews);
    const tabinfos = document.querySelector('.news-list-header');
    tabinfos.innerHTML = '';

    fnews.forEach(it => {
        tabinfos.innerHTML += `<article class="text-button">${it}</article>`;
    });

    const tbuttons = document.querySelectorAll('.text-button');

    const updateTab = (index) => {
        tbuttons.forEach((btn, idx) => {
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

        const buttonText = tbuttons[index].textContent;
        console.log(buttonText);
        window.btntext = buttonText;
        updateSubDisplay(buttonText);
    };

    tbuttons.forEach((bbtt, index) => {
        bbtt.addEventListener('click', () => {
            subsindex = index;
            updateTab(subsindex);
        });
    });

    updateTab(subsindex);

    clearInterval(subProgressTimer);
    subProgressTimer = setInterval(() => {
        subsindex = (subsindex + 1) % tbuttons.length;
        updateTab(subsindex);
    }, 2000);
};
//관심 언론사 선택하였을 때, 페이지 넘김에 따른 화면 보여줌
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