import globalState from '../../../app/GlobalState.js';
import { StateKey } from '../../../namespace/StateKey.js';

class PressCategoryModel {
    constructor() {
        this.state = {
            isAllPress: globalState.getState(StateKey.IS_ALLPRESS),
            tabFields: globalState.getState(StateKey.TABFIELDS),
            selectedCategoryIndex: globalState.getState(StateKey.SELECTED_CATEGORY_INDEX),
            selectedCategoryCountIndex: globalState.getState(StateKey.SELECTED_CATEGORY_COUNT_INDEX),
            countInfo: ''
        };

        this.setCountInfo()
    }

    setCountInfo() {
        this.state.countInfo = `${this.state.selectedCategoryCountIndex + 1}/${this.state.tabFields[this.state.selectedCategoryIndex].tabData.length}`;
    }

    getState() {
        return this.state;
    }

    setState(newState) {
        this.state = { ...this.state, ...newState };
        this.setCountInfo();
    }

    setSelectedIndex(index) {
        this.setState({ selectedCategoryIndex: index });
        this.setState({ selectedCategoryCountIndex: 0 });

        globalState.setState(StateKey.SELECTED_CATEGORY_INDEX, index);
        globalState.setState(StateKey.SELECTED_CATEGORY_COUNT_INDEX, 0);
    }
}

export default PressCategoryModel;
