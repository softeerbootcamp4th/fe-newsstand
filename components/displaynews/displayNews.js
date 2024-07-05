let newsData = [];

document.addEventListener('DOMContentLoaded', function() {
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
            // 초기화면 표시
            updateNewsDisplay('economy'); // 초기 섹션 - 종합.경제
        })
        .catch(error => console.error('Error loading JSON:', error));
});

export function updateNewsDisplay(pressType, idx) {
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
