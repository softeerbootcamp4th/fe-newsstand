import { API } from "./magicNumber.js";
import { responseToJson } from "./util.js";

//회사명 기준 아티클 정렬
function getCompaniesWithArticles(articleDataList) {
    const companiesWithArticles = {};
    articleDataList.forEach(subjectObject => {
        subjectObject.companies.forEach(company => {
            const { name, image, articles } = company;
            if (companiesWithArticles[name] === undefined) {
                companiesWithArticles[name] = {
                    name,
                    image,
                    articles: []
                };
            }
            const targetComapny = companiesWithArticles[name];
            targetComapny.articles = targetComapny.articles.concat(articles);
        });
    });
    return companiesWithArticles;
}

export async function fetchData() {
    return Promise.all([
        fetchArticles(),
        fetchPreviewArticles()
    ]);
}

function fetchArticles() {
    return new Promise((resolve, reject) => {
        fetch(API.GET_ARTICLES)
            .then(responseToJson)
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
        fetch(API.GET_PREVIEW_ARTICLES)
            .then(responseToJson)
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