import { StateKey } from '../../../namespace/StateKey.js';
import globalState from '../../../app/GlobalState.js';
import PressCategoryModel from "./pressCategoryModel.js";
import PressCategoryView from './PressCategoryView.js';

class PressCategoryController {
    constructor() {
        this.model = new PressCategoryModel();
        this.view = new PressCategoryView({
            onClickCategory: (id) => { this.onChangeCategory(id); }
        });

        this.render();

        globalState.subscribe(StateKey.IS_ALLPRESS, (value) => {
            this.updateModel(StateKey.IS_ALLPRESS, value);
        });

        globalState.subscribe(StateKey.TABFIELDS, (value) => {
            this.updateModel(StateKey.TABFIELDS, value);
        });

        globalState.subscribe(StateKey.SELECTED_CATEGORY_INDEX, (value) => {
            this.updateModel(StateKey.SELECTED_CATEGORY_INDEX, value);
        });

        globalState.subscribe(StateKey.SELECTED_CATEGORY_COUNT_INDEX, (value) => {
            this.updateModel(StateKey.SELECTED_CATEGORY_COUNT_INDEX, value);
        });

        this.updateModel(); 
    }

    updateModel(key, value) {
        if (key) {
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