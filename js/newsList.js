function newsListController(categoryData, newsIndex) {
    setMainNews(categoryData, newsIndex - 1);
    setNewsList(categoryData, newsIndex - 1);
    setMediaAnnotation(categoryData);
}

function setMainNews(categoryData, newsIndex) {
    const mainNewsTitle = document.querySelector(".news-list__main__heading__title");
    const mainNewsDate = document.querySelector(".news-list__main__heading__date");
    const mainNewsCompany = document.querySelector(".news-list__main__heading__company");

    mainNewsTitle.innerText = categoryData[newsIndex * 7].title;
    mainNewsDate.innerText = categoryData[newsIndex * 7].date;
    mainNewsCompany.innerText = categoryData[newsIndex * 7].media;
}

function setNewsList(categoryData, newsIndex) {
    const newsList = document.querySelectorAll(".news-list__main__list__title");

    newsList.forEach((news, index) => {
        news.innerText = categoryData[newsIndex * 7 + (index + 1)].title;
    })
}

function setMediaAnnotation(categoryData) {
    const mediaAnnotation = document.querySelector(".news-list__main__list__media-annotation");
    
    mediaAnnotation.innerText = `${categoryData[0].media} 언론사에서 직접 편집한 뉴스입니다.`
}

export { newsListController }