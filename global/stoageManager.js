/**
 * localStorage 관리자
 */
class StorageManager {
  constructor() {
    // 싱글톤 보장 조건문
    if (StorageManager.instance) {
      return StorageManager.instance;
    }
    StorageManager.instance = this;
  }

  /**
   * localStorage에 아이템 등록
   * @param {*} key
   * @param {*} value
   */
  setItem(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  /**
   * localStorage에서 키를 통해 아이템 가져옴
   * @param {*} key
   * @returns
   */
  getItem(key) {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  }

  /**
   * localStorage에서 키를 통해 아이템 삭제
   * @param {*} key
   */
  removeItem(key) {
    localStorage.removeItem(key);
  }

  /**
   * localStorage 비우기
   */
  clear() {
    localStorage.clear();
  }

  /**
   * localStorage에서 Set을 가져옴
   * @param {*} key
   * @returns
   */
  getSet(key) {
    const set = this.getItem(key);
    return set ? new Set(set) : new Set();
  }

  /**
   * localStorage에 Set을 저장
   * @param {*} key
   * @param {*} set
   */
  setSet(key, set) {
    if (!(set instanceof Set)) {
      throw new Error("Value should be a Set");
    }
    this.setItem(key, [...set]);
  }

  /**
   * localStorage에서 Set에 아이템 추가
   * @param {*} key
   * @param {*} item
   */
  addItemToSet(key, item) {
    const set = this.getSet(key);
    set.add(item);
    this.setSet(key, set);
  }

  /**
   * localStorage에서 Set에서 아이템 제거
   * @param {*} key
   * @param {*} item
   */
  removeItemFromSet(key, item) {
    const set = this.getSet(key);
    set.delete(item);
    this.setSet(key, set);
  }

  /**
   * localStorage에서 Set을 배열로 변환하여 반환
   * @param {*} key
   * @returns
   */
  getSetAsArray(key) {
    const set = this.getSet(key);
    return [...set];
  }
}

export default new StorageManager();
