
export function showsubs(alljson, pname){
    alljson.forEach(item => {
        if (item.pressName === pname) {
            // 일치하는 아이템의 모든 정보를 콘솔에 출력
            console.log(`Press Name: ${item.pressName}`);
            console.log(`Category: ${item.category}`);
            console.log(`Title: ${item.title}`);
            // 추가 필드가 있을 경우 같은 방식으로 출력
        }
    });
}

export function showmysub(subitem, pn){
    document.querySelector('.news-press-img img').src = subitem.pressImg;
    document.querySelector('.news-press-edit').textContent = subitem.edittime;
    document.querySelector('.news-image-container img').src = subitem.mainphoto;
    document.querySelector('.news-title').textContent = subitem.maintitle;
    document.querySelector('.text-button').textContent = pn;
    const newsSubTitles = document.querySelectorAll('.news-sub-titles');
    subitem.news.forEach((news, index) => {
        newsSubTitles[index].textContent = news.title;
        newsSubTitles[index].href = news.url;
    });
}
