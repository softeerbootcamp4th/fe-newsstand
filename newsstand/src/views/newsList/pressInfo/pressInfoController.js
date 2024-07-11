import { StateKey } from "../../../namespace/StateKey.js";
import globalState from "../../../app/GlobalState.js";

import PressInfoModel from "./pressInfoModel.js";
import PressInfoView from "./pressInfoView.js";

class PressInfoController {
    constructor() {
        this.model = new PressInfoModel();
        this.view = new PressInfoView({onClickChipButton: () => this.onChipButtonClick()});

        globalState.subscribe(StateKey.selectedCategoryCountIndex, this.updateModel.bind(this));

        this.render();
        this.updateModel();
    }

    updateModel() {
        const tabFields = globalState.getState(StateKey.tabFields);
        const selectedCategoryIndex = globalState.getState(StateKey.selectedCategoryIndex);
        const selectedCategoryCountIndex = globalState.getState(StateKey.selectedCategoryCountIndex);

        const pressData = tabFields[selectedCategoryIndex].tabData[selectedCategoryCountIndex];

        this.model.setPress(pressData);
        this.view.update(pressData);
    }

    render() {
        this.view.render();
    }

    onChipButtonClick() {
        this.model.toggleSubscription();
        const pressData = this.model.getPress();
        if (pressData.subscribe === 'Y') {
            // LOCALSTORAGE MANAGER 추가해서 구독 정보 저장하기
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