export function filterData(newsData) {
    let info = [];
    newsData.forEach(data => {
        data.news.forEach(newsItem => {
            info.push({company : newsItem.company, logoUrl : newsItem.logoUrl});
        });
    });

    return info;
}
