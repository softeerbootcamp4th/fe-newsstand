import { StateKey } from "../../namespace/StateKey.js";
import globalState from "./../../app/GlobalState.js";

class PressMenuModel {
    constructor() {
        this.isAllPress = null;
        this.isGrid = null;
    }

    getAllPress() {
        return this.isAllPress;
    }

    setAllPress(isAllPress) {
        this.isAllPress = isAllPress;

        globalState.setState(StateKey.IS_ALLPRESS, isAllPress);
        globalState.setState(StateKey.TABFIELDS, isAllPress? DataManager.getAllPressTabs(): DataManager.getSubscribedPressTabs());
        globalState.setState(StateKey.SELECTED_CATEGORY_INDEX, 0);
        globalState.setState(StateKey.SELECTED_CATEGORY_COUNT_INDEX, 0);
    }

    getGrid() {
        return this.isGrid;
    }

    setGridView(isGrid) {
        this.isGrid = isGrid;

        globalState.setState(StateKey.IS_GRIDVIEW, isGrid);
    }
}

export default PressMenuModel;
