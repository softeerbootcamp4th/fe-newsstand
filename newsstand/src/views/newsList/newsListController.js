import NewsListModel from "./newsListModel.js";
import NewsListView from "./newsListView.js";

import PressCategoryController from "./pressCategory/pressCategoryController.js";
import PressInfoController from "./pressInfo/pressInfoController.js";
import PressNewsController from "./pressNews/pressNewsController.js";

import intervalManager from "../../manager/intervalManager.js";
import { IntervalKey, IntervalConst } from "../../namespace/intervalKey.js";
import globalState from "../../app/GlobalState.js";
import { StateKey } from "../../namespace/StateKey.js";

class NewsListController {
  constructor() {
    this.model = new NewsListModel();
    this.view = new NewsListView({ onClickArrowButton: (value) => this.handleArrowButtonClick(value)});

    this.pressCategoryController = new PressCategoryController();
    this.pressInfoController = new PressInfoController();
    this.pressNewsController = new PressNewsController();

    this.view.render(
      this.pressCategoryController.getElement(),
      this.pressInfoController.getElement(),
      this.pressNewsController.getElement()
    );

    globalState.subscribe(StateKey.TABFIELDS, (value) =>
      this.updateModel(StateKey.TABFIELDS, value)
    );
    globalState.subscribe(StateKey.SELECTED_CATEGORY_INDEX, (value) =>
      this.updateModel(StateKey.SELECTED_CATEGORY_INDEX, value)
    );
    globalState.subscribe(StateKey.SELECTED_CATEGORY_COUNT_INDEX, (value) =>
      this.updateModel(StateKey.SELECTED_CATEGORY_COUNT_INDEX, value)
    );

    this.updateModel();

    intervalManager.startTimer(IntervalKey.PROGRESS, () => this.handleArrowButtonClick("next"), IntervalConst.PROGRESS_TIME)
  }

  changeToNextPress() {
    this.model.moveNextPress();
  }

  changeToPrevPress() {
    this.model.movePrevPress();
  }

  handleArrowButtonClick(direction) {
    if (direction === "prev") {
      this.changeToPrevPress();
    } else if (direction === "next") {
      this.changeToNextPress();
    }
  }

  updateModel(key, value) {
    if (key) {
      this.model.setState({ [key]: value });
    }

    const newState = this.model.getState();
    this.view.update(newState);
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
