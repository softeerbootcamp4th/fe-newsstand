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
        globalState.setState(StateKey.isAllPress, isAllPress);
    }

    getGrid() {
        return this.isGrid;
    }

    setGridView(isGrid) {
        this.isGrid = isGrid;
        globalState.setState(StateKey.isGrid, isGrid);
    }
}

export default PressMenuModel;
