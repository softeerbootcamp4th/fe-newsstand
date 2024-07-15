/**
 * @description 리스트의 순서를 섞어서 반환하는 함수 (Fisher-Yates 셔플 함수)
 * 
 * @returns [1, 2, 3] -> [2, 1, 3]
 */
export function shuffleList(list) {
    let currentIndex = list.length, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        [list[currentIndex], list[randomIndex]] = [list[randomIndex], list[currentIndex]];
    }

    return list;
}
