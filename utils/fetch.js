/**
 * @description 데이터를 fetch 해서 데이터를 가져오는 함수
 */
export async function getData(url) {
    const data = await fetch(url);
    return data.json();
}