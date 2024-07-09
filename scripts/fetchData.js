import articleDataList from '../json/articleDataList.js';
//회사명 기준 아티클 정렬
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

export function fetchData() {
    return new Promise((resolve,reject) => {
        setTimeout(() => {
            resolve({
                articleDataList,
                companiesWithArticles
            })
        },1000);
    })
}