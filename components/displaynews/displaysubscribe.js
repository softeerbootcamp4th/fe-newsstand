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
} 
