const articleDataList = new Array(30).fill(0).map((d, i) => {
    return {
        index: i,
        subject: `${i}번 제목`,
        companies: new Array(10).fill(0).map((_, companyIndex) => {
            return {
                name: `${companyIndex}번 회사`,
                articles: new Array(6).fill(0).map((_, index) => {
                    return {
                        title: `${i}번 주제 ${companyIndex}번 회사 ${index} 번 기사`,
                        image: `https://picsum.photos/320/200?test=${i}-${index}`,
                        registerDate: `2023.${Math.floor(Math.random() * 13)}.10. ${Math.floor(Math.random() * 23)}:${Math.floor(Math.random() * 60)} 편집`
                    }
                }),
                image: `https://picsum.photos/320/200?test=${i}-${companyIndex}`
            }
        })
    }
});
// console.log(JSON.stringify(articleDataList))
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