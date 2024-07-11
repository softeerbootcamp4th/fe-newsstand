import globalState from "../../app/GlobalState.js";
import { StateKey } from "../../namespace/StateKey.js";

class NewsListModel {
    constructor() {
        this.selectedPressIndex = globalState.getState(StateKey.selectedCategoryCountIndex);
        this.selectedCategoryIndex = globalState.getState(StateKey.selectedCategoryIndex);


        this.tabFieldsLength = 0;
        this.tabDataLength = 0;
    }

    updateModel() {
        this.tabFieldsLength = globalState.getState(StateKey.tabFields).length;
        this.tabDataLength = globalState.getState(StateKey.tabFields)[this.selectedCategoryIndex].tabData.length;
    }

    moveNextPress() {
        this.selectedPressIndex += 1;
        if (this.selectedPressIndex >= this.tabDataLength) {
            this.selectedPressIndex = 0;
            this.moveNextCategory();
        }

        globalState.setState(StateKey.selectedCategoryCountIndex, this.selectedPressIndex);
    }

    movePrevPress() {
        this.selectedPressIndex -= 1;

        if (this.selectedPressIndex < 0) {
            this.movePrevCategory();
        } else {
            globalState.setState(StateKey.selectedCategoryCountIndex, this.selectedPressIndex);
        }
    }

    moveNextCategory() {
        this.selectedCategoryIndex += 1;
        if (this.selectedCategoryIndex >= this.tabFieldsLength) {
            this.selectedCategoryIndex = 0;
        }
        this.selectedPressIndex = 0;

        globalState.setState(StateKey.selectedCategoryIndex, this.selectedCategoryIndex);
        globalState.setState(StateKey.selectedCategoryCountIndex, this.selectedPressIndex);
    }

    movePrevCategory() {
        this.selectedCategoryIndex -= 1;
        if (this.selectedCategoryIndex < 0) {
            this.selectedCategoryIndex = this.tabFieldsLength - 1;
        }
        this.selectedPressIndex = 0;

        globalState.setState(StateKey.selectedCategoryIndex, this.selectedCategoryIndex);
        globalState.setState(StateKey.selectedCategoryCountIndex, this.selectedPressIndex);
    }

    getCountInfo() {
        return this.isAllPress ? `${this.selectedPressIndex + 1}/${this.getSelectedCategory().tabData.length}` : null;
    }
}

export default NewsListModel;
