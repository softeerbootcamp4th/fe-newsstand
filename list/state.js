class State {
  constructor() {
    //싱글톤 보장 조건문
    if (State.instance) {
      return State.instance;
    }

    this._currentCategoryIndex = 0;
    this._currentMediaIndex = 0;
    this._headerCategory = 0;

    State.instance = this;
    return this;
  }

  get currentCategoryIndex() {
    return this._currentCategoryIndex;
  }
  set currentCategoryIndex(index) {
    this._currentCategoryIndex = index;
  }

  get currentMediaIndex() {
    return this._currentMediaIndex;
  }
  set currentMediaIndex(index) {
    this._currentMediaIndex = index;
  }

  get headerCategory() {
    return this._headerCategory;
  }
  set headerCategory(category) {
    this._headerCategory = category;
  }
}

export default new State();
