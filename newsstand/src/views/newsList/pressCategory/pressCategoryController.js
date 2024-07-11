import { StateKey } from '../../../namespace/StateKey.js';
import globalState from '../../../app/GlobalState.js';
import PressCategoryModel from "./pressCategoryModel.js";
import PressCategoryView from './PressCategoryView.js';

class PressCategoryController {
    constructor() {
        this.model = new PressCategoryModel();
        this.view = new PressCategoryView({
            onClickCategory: () => { this.onChangeCategory(); }
        });

        this.render();

        globalState.subscribe(StateKey.isAllPress, (value) => {
            this.updateModel(StateKey.isAllPress, value);
        });

        globalState.subscribe(StateKey.tabFields, (value) => {
            this.updateModel(StateKey.tabFields, value);
        });

        globalState.subscribe(StateKey.selectedCategoryIndex, (value) => {
            this.updateModel(StateKey.selectedCategoryIndex, value);
        });

        globalState.subscribe(StateKey.selectedCategoryCountIndex, (value) => {
            this.updateModel(StateKey.selectedCategoryCountIndex, value);
        });

        this.updateModel();
    }

    updateModel(key, value) {
        if (key && value) {
            this.model.setState({ [key]: value });
        } 

        const newState = this.model.getState();
        this.view.update(newState);
    }

    render() {
        this.view.render();
    }

    onChangeCategory(intId) {
        this.model.setSelectedIndex(intId);
    }

    getElement() {
        return this.view.getElement();
    }
}

export default PressCategoryController;