import TAB_NEWS_DATA from "../../../data/tabNewsData.js";
import storageManager from "../../manager/localStorageManager.js";
import { StorageKey } from "../../namespace/StorageKey.js";

export default class MainModel {
  constructor() {
    this.isAllPress = true;
    this.isList = true;
  }

  setAllPress(newValue) {
    this.isAllPress = newValue;
  }

  setListView(newValue) {
    this.isList = newValue;
  }

  getState() {
    return {
      isAllPress: this.isAllPress,
      isList: this.isList,
    };
  }
}
