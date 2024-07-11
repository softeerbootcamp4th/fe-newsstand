import { StateKey } from '../../namespace/StateKey.js';
import globalState from '../../app/GlobalState.js';
import PressMenuModel from './pressMenuModel.js';
import PressMenuView from './pressMenuView.js';
import DataManager from '../../manager/dataManager.js';

class PressMenuController {
    constructor() {
        this.model = new PressMenuModel();
        this.view = new PressMenuView();

        this.view.render();

        this.handleToggleAllPress = this.handleToggleAllPress.bind(this);
        this.handleToggleListView = this.handleToggleListView.bind(this);

        this.view.addEventListenerToSubscribeButtons(this.handleToggleAllPress);
        this.view.addEventListenerToListButtons(this.handleToggleListView);

        globalState.subscribe(StateKey.isAllPress, (value) => this.updateModel(value));
        globalState.subscribe(StateKey.isGridView, (value) => this.updateModel(value));
    }

    updateModel(newState) {
        this.view.render();

        // addEventListener 부분 수정하기
        this.handleToggleAllPress = this.handleToggleAllPress.bind(this);
        this.handleToggleListView = this.handleToggleListView.bind(this);

        this.view.addEventListenerToSubscribeButtons(this.handleToggleAllPress);
        this.view.addEventListenerToListButtons(this.handleToggleListView);
    }

    handleToggleAllPress(isAllPress) {
        this.model.setAllPress(isAllPress);

        globalState.setState(StateKey.tabFields, isAllPress? DataManager.getAllPressTabs(): DataManager.getSubscribedPressTabs());
    }

    handleToggleListView(isListView) {
        this.model.setGridView(isListView);
    }

    getElement() {
        return this.view.getElement();
    }
}

export default PressMenuController;