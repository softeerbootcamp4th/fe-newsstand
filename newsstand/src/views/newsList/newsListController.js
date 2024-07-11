import NewsListModel from './newsListModel.js';
import NewsListView from './newsListView.js';

import PressCategoryController from './pressCategory/pressCategoryController.js';
import PressInfoController from './pressInfo/pressInfoController.js';
import PressNewsController from './pressNews/pressNewsController.js';

import intervalManager from '../../manager/intervalManager.js';
import { IntervalKey, IntervalConst } from '../../namespace/intervalKey.js';
import globalState from '../../app/GlobalState.js';
import { StateKey } from '../../namespace/StateKey.js';
import DataManager from '../../manager/dataManager.js';

class NewsListController {
    constructor() {
        this.model = new NewsListModel();
        this.view = new NewsListView();

        this.pressCategoryController = new PressCategoryController();
        this.pressInfoController = new PressInfoController();
        this.pressNewsController = new PressNewsController();

        this.view.render(
            this.pressCategoryController.getElement(),
            this.pressInfoController.getElement(),
            this.pressNewsController.getElement()
        );

        globalState.subscribe(StateKey.tabFields, (value) => this.updateModel(value))
        // globalState.subscribe(StateKey.isAllPress, this.updateModel) => 안됨
        this.updateModel()

        intervalManager.startTimer(IntervalKey.Progress, this.changeToNextPress.bind(this), IntervalConst.ProgressTime);

        this.view.addEventListenerToArrowButton(this.handleArrowButtonClick.bind(this));
    }

    handleChangeCategory(index) {
        this.model.updateSelectedCategory(index);
    }

    changeToNextPress() {
        this.model.moveNextPress();
    }

    changeToPrevPress() {
        this.model.movePrevPress();
    }

    handleArrowButtonClick(direction) {
        if (direction === 'prev') {
            this.changeToPrevPress();
        } else if (direction === 'next') {
            this.changeToNextPress();
        }
    }

    updateModel() {
        this.model.updateModel();
    }
    
      render() {
        this.view.render(
            this.pressCategoryController.getElement(),
            this.pressInfoController.getElement(),
            this.pressNewsController.getElement()
        );
      }

    getElement() {
        return this.view.getElement();
    }
}

export default NewsListController;
