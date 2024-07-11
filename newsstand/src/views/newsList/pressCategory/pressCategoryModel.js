import globalState from '../../../app/GlobalState.js';
import { StateKey } from '../../../namespace/StateKey.js';

class PressCategoryModel {
    constructor() {
        this.state = {
            isAllPress: globalState.getState(StateKey.isAllPress),
            tabFields: globalState.getState(StateKey.tabFields),
            selectedCategoryIndex: globalState.getState(StateKey.selectedCategoryIndex),
            selectedCategoryCountIndex: globalState.getState(StateKey.selectedCategoryCountIndex),
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
        console.log(this.state.countInfo);
    }

    setSelectedIndex(index) {
        this.setState({ selectedCategoryIndex: index });
        globalState.setState(StateKey.selectedCategoryIndex, index);
    }
}

export default PressCategoryModel;
