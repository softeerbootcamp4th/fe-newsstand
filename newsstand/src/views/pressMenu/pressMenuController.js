import { StateKey } from '../../namespace/StateKey.js';
import globalState from '../../app/GlobalState.js';
import PressMenuModel from './pressMenuModel.js';
import PressMenuView from './pressMenuView.js';
import DataManager from '../../manager/dataManager.js';

class PressMenuController {
    constructor() {
        this.model = new PressMenuModel();
        this.view = new PressMenuView({ 
            onClickSubscribeMenu: (value) => this.handleAllPress(value), 
            onClickListMenu: (value) => this.handleListView(value)
        });

        this.view.render();

        globalState.subscribe(StateKey.IS_ALLPRESS, (value) => this.updateModel(value));
        globalState.subscribe(StateKey.IS_GRIDVIEW, (value) => this.updateModel(value));
    }

    updateModel(newState) {
        this.view.render();
    }

    handleAllPress(isAllPress) {
        this.model.setAllPress(isAllPress);
    }

    handleListView(isListView) {
        this.model.setGridView(isListView);
    }

    getElement() {
        return this.view.getElement();
    }
}

export default PressMenuController;