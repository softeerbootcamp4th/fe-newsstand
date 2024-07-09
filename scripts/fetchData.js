import articleDataList from '../json/articleDataList.js';
//회사명 기준 아티클 정렬

function getCompaniesWithArticles(articleDataList) {
    const companiesWithArticles = {};
    articleDataList.forEach(subjectObject => {
        subjectObject.companies.forEach(company => {
            if(companiesWithArticles[company.name] === undefined){
                companiesWithArticles[company.name] = { 
                   name: company.name,
                   articles: [],
                   image: company.image
                 };
            }
            companiesWithArticles[company.name].articles =companiesWithArticles[company.name].articles.concat(company.articles);
        });
    });
    return companiesWithArticles;
}

export function fetchData() {
    //데이터 API 인터페이스
    return new Promise((resolve,reject) => {
        //json server API call
        fetch("http://dating.batro.org:4000/v1/test/get_articles")
        .then(res => {
            return res.json();
        })
        .then(resjson => {
            console.log(resjson)
            resolve({
                articleDataList,
                companiesWithArticles: getCompaniesWithArticles(articleDataList)
            })
        })
    })
}