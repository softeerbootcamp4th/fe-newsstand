//회사명 기준 아티클 정렬
function getCompaniesWithArticles(articleDataList) {
    const companiesWithArticles = {};
    //개선해보자
    articleDataList.forEach(subjectObject => {
        subjectObject.companies.forEach(company => {
            if (companiesWithArticles[company.name] === undefined) {
                companiesWithArticles[company.name] = {
                    name: company.name,
                    articles: [],
                    image: company.image
                };
            }
            companiesWithArticles[company.name].articles = companiesWithArticles[company.name].articles.concat(company.articles);
        });
    });
    return companiesWithArticles;
}

export async function fetchData() {
    return Promise.all([
        fetchArticles(),
        fetchPreviewArticles()
    ])
}

function fetchArticles() {
    return new Promise((resolve, reject) => {
        //json server API call
        fetch("http://dating.batro.org:4000/v1/test/get_articles")
            .then(res => {
                return res.json();
            })
            .then(resjson => {
                const { articleDataList } = resjson.data;
                resolve({
                    articleDataList,
                    companiesWithArticles: getCompaniesWithArticles(articleDataList)
                })
            })
    })
}

function fetchPreviewArticles() {
    return new Promise((resolve, reject) => {
        //json server API call
        fetch("http://dating.batro.org:4000/v1/test/get_preview_articles")
            .then(res => {
                return res.json();
            })
            .then(resjson => {
                const { articleData } = resjson.data;
                const { left_rotating_string_list, right_rotating_string_list } = articleData;
                resolve({
                    left_rotating_string_list,
                    right_rotating_string_list
                })
            })
    })
}