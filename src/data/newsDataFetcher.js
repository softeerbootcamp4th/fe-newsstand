/**
 * 로컬 서버에서 뉴스 데이터를 가져와 json 데이터를 반환하는 함수
 * @returns {json} - 뉴스 json 데이터
 */
export async function fetchAllNewsData() {
    const allNewsResponse = await fetch(`http://127.0.0.1:8000/newsList?subAllInfo=all`);
    const allNewsData = await allNewsResponse.json();
    return allNewsData;
}

export async function fetchSubscribedNewsData() {
    const subscribedNewsResponse = await fetch(`http://127.0.0.1:8000/newsList?subAllInfo=sub`);
    const subscribedNewsData = await subscribedNewsResponse.json();
    return subscribedNewsData
}

export async function fetchRollingNewsData() {
    const rollingNewsResponse = await fetch(`http://127.0.0.1:8000/rollingNewsList`);
    const rollingNewsData = await rollingNewsResponse.json();
    return rollingNewsData
}