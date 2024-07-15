/**
 * @description 주어진 id의 아이템 index를 반환해주는 함수
 */
export function getIndex(id, list) {
    const index = list.findIndex((_data) => _data.id === id);
    return index === -1 ? 0 : index;
}
