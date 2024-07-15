import { StateKey } from "../../../namespace/StateKey.js";
import globalState from "../../../app/GlobalState.js";
import PressNewsModel from "./pressNewsModel.js";
import PressNewsView from "./pressNewsView.js";

class PressNewsController {
  constructor() {
    this.model = new PressNewsModel();
    this.view = new PressNewsView();

    this.render();

    globalState.subscribe(StateKey.SELECTED_CATEGORY_COUNT_INDEX, () => { this.updateModel() });
    globalState.subscribe(StateKey.SELECTED_CATEGORY_INDEX, () => { this.updateModel() });

    this.updateModel();
  }

  updateModel() {

    const tabFields = globalState.getState(StateKey.TABFIELDS);
    const selectedCategoryIndex = globalState.getState(StateKey.SELECTED_CATEGORY_INDEX);
    const selectedCategoryCountIndex = globalState.getState(StateKey.SELECTED_CATEGORY_COUNT_INDEX);

    const news = tabFields[selectedCategoryIndex].tabData[selectedCategoryCountIndex];

    this.model.setNews(news);
    this.view.update(news);
  }

  render() {
    this.view.render();
  }

  getElement() {
    return this.view.getElement();
  }
}

export default PressNewsController;
