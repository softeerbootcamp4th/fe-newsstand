import globalState from "../../app/GlobalState.js";
import { StateKey } from "../../namespace/StateKey.js";

class NewsListModel {
    constructor() {
        const initialTabFields = globalState.getState(StateKey.TABFIELDS);
        const initialSelectedCategoryCountIndex = globalState.getState(StateKey.SELECTED_CATEGORY_COUNT_INDEX);
        const initialSelectedCategoryIndex = globalState.getState(StateKey.SELECTED_CATEGORY_INDEX);
        this.state = {
            tabFields: initialTabFields,
            selectedCategoryCountIndex: initialSelectedCategoryCountIndex,
            selectedCategoryIndex: initialSelectedCategoryIndex,

            tabFieldsLength: initialTabFields.length,
            tabDataLength: initialTabFields[initialSelectedCategoryIndex].tabData.length,
        }
    }

    getState() {
        return this.state;
    }

    setState(newState) {
        this.state = { ...this.state, ...newState };
        this.setTabFieldsLength()
        this.setTabDataLength()
    }

    setTabFieldsLength() {
        this.state.tabFieldsLength = this.state.tabFields.length;
    }

    setTabDataLength() {
        this.state.tabDataLength = this.state.tabFields[this.state.selectedCategoryIndex].tabData.length;
    }

    moveNextPress() {
        this.state.selectedCategoryCountIndex += 1;

        if (this.state.selectedCategoryCountIndex >= this.state.tabDataLength) {
            this.moveNextCategory();
        } else {
            globalState.setState(StateKey.SELECTED_CATEGORY_COUNT_INDEX, this.state.selectedCategoryCountIndex);
        }
    }

    movePrevPress() {
        this.state.selectedCategoryCountIndex -= 1;

        if (this.state.selectedCategoryCountIndex < 0) {
            this.movePrevCategory();
        } else {
            globalState.setState(StateKey.SELECTED_CATEGORY_COUNT_INDEX, this.state.selectedCategoryCountIndex);
        }
    }

    moveNextCategory() {
        this.state.selectedCategoryIndex += 1;
        if (this.state.selectedCategoryIndex >= this.state.tabFieldsLength) {
            this.state.selectedCategoryIndex = 0;
        }
        this.state.selectedCategoryCountIndex = 0;

        globalState.setState(StateKey.SELECTED_CATEGORY_COUNT_INDEX, this.state.selectedCategoryCountIndex);
        globalState.setState(StateKey.SELECTED_CATEGORY_INDEX, this.state.selectedCategoryIndex);
    }

    movePrevCategory() {
        this.state.selectedCategoryIndex -= 1;
        if (this.state.selectedCategoryIndex < 0) {
            this.state.selectedCategoryIndex = this.state.tabFieldsLength - 1;
        }
        this.state.selectedCategoryCountIndex = 0;

        globalState.setState(StateKey.SELECTED_CATEGORY_COUNT_INDEX, this.state.selectedCategoryCountIndex);
        globalState.setState(StateKey.SELECTED_CATEGORY_INDEX, this.state.selectedCategoryIndex);
       
    }
}

export default NewsListModel;
