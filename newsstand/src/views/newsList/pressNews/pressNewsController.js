import { StateKey } from "../../../namespace/StateKey.js";
import globalState from "../../../app/GlobalState.js";
import PressNewsModel from "./pressNewsModel.js";
import PressNewsView from "./pressNewsView.js";

class PressNewsController {
  constructor() {
    this.model = new PressNewsModel();
    this.view = new PressNewsView();

    globalState.subscribe(StateKey.selectedCategoryCountIndex, () => { this.updateModel() });
  
    this.render();
    this.updateModel();
  }

  updateModel() {
    const tabFields = globalState.getState(StateKey.tabFields);
    const selectedCategoryIndex = globalState.getState(StateKey.selectedCategoryIndex);
    const selectedCategoryCountIndex = globalState.getState(StateKey.selectedCategoryCountIndex);

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
