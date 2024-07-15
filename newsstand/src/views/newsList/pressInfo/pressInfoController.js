import { StateKey } from "../../../namespace/StateKey.js";
import globalState from "../../../app/GlobalState.js";

import PressInfoModel from "./pressInfoModel.js";
import PressInfoView from "./pressInfoView.js";
import DataManager from "../../../manager/dataManager.js";
import storageManager from "../../../manager/localStorageManager.js";
import { StorageKey } from "../../../namespace/StorageKey.js";

class PressInfoController {
    constructor() {
        this.model = new PressInfoModel();
        this.view = new PressInfoView({
            onClickChipButton: () => this.onChipButtonClick(),
            callbackSubscribed: () => this.moveToSubscribePress()
        });

        this.render();

        globalState.subscribe(StateKey.SELECTED_CATEGORY_COUNT_INDEX, () => this.updateModel());

        this.updateModel();
    }

    updateModel() {
        const tabFields = globalState.getState(StateKey.TABFIELDS);
        const selectedCategoryIndex = globalState.getState(StateKey.SELECTED_CATEGORY_INDEX);
        const selectedCategoryCountIndex = globalState.getState(StateKey.SELECTED_CATEGORY_COUNT_INDEX);

        const pressData = tabFields[selectedCategoryIndex].tabData[selectedCategoryCountIndex];

        this.model.setPress(pressData);
        this.view.update(pressData);
    }

    render() {
        this.view.render();
    }

    moveToSubscribePress() {
        const tabs = DataManager.getSubscribedPressTabs();

        const pressData = this.model.getPress();
        const index = tabs.findIndex(tab => tab.tabName === pressData.mediaName);

        globalState.setState(StateKey.IS_ALLPRESS, false);
        globalState.setState(StateKey.TABFIELDS, tabs);
        globalState.setState(StateKey.SELECTED_CATEGORY_INDEX, index);
        globalState.setState(StateKey.SELECTED_CATEGORY_COUNT_INDEX, 0);
    }

    onChipButtonClick() {
        this.model.toggleSubscription();
        const pressData = this.model.getPress();
        if (pressData.subscribe === 'Y') {
            storageManager.setStorage(StorageKey.SUBSCRIBED, pressData.mediaName);
            this.view.showSnackBar();
        } else {
            this.view.showAlert(pressData);
        }
        this.view.update(pressData);
    }

    getElement() {
        return this.view.getElement();
    }
}

export default PressInfoController;