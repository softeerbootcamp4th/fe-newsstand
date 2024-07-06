let newsData = [];

document.addEventListener('DOMContentLoaded', () => {
    fetch('../../news/allnews.json')
        .then(response => response.json())
        .then(data => {
            newsData = data;
            const buttons = document.querySelectorAll('.text-button');
            buttons.forEach(button => {
                button.addEventListener('click', function() {
                    updateNewsDisplay(this.id);
                });
            });
            
        })
        .catch(error => console.error('Error loading JSON:', error));
});

//뉴스 종류를 선택하였을 때, 페이지 넘김에 따른 컨텐츠 변화 함수 
export const updateNewsDisplay = (pressType, idx)  =>{
    const filteredNews = newsData.filter(item => item.pressType === pressType);
    const newsItem = filteredNews.find(item => item.pid == idx);

    if (newsItem) {
        document.querySelector('.news-press-img img').src = newsItem.pressImg;
        document.querySelector('.news-press-edit').textContent = newsItem.edittime;
        document.querySelector('.news-image-container img').src = newsItem.mainphoto;
        document.querySelector('.news-title').textContent = newsItem.maintitle;
        const newsSubTitles = document.querySelectorAll('.news-sub-titles');
        newsItem.news.forEach((news, index) => {
            newsSubTitles[index].textContent = news.title;
            newsSubTitles[index].href = news.url;
        });
    }
}
