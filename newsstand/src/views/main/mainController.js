import MainModel from "./mainModel.js";
import MainView from "./mainView.js";
import PressMenuController from "../pressMenu/pressMenuController.js";
import NewsListController from "../newsList/NewsListController.js";

export class MainController {
  constructor() {
    this.model = new MainModel();
    this.view = new MainView();
    this.pressMenuController = new PressMenuController();
    this.newsListController = new NewsListController();

    this.view.render(
      this.pressMenuController.getElement(),
      this.newsListController.getElement()
    );
  }

  handleToggleAllPress(newValue) {
    this.model.setAllPress(newValue);
    this.updateNewsList();
  }

  handleToggleListView(newValue) {
    this.model.setListView(newValue);
    this.updateNewsList();
  }

  updateNewsList() {
    this.newsListController = new NewsListController({
      isAllPress: this.model.getState().isAllPress,
      tabs: this.model.createTabs(),
    });
    this.view.render(
      this.pressMenuController.getElement(),
      this.newsListController.getElement()
    );
  }

  getElement() {
    return this.view.getElement();
  }
}

export default MainController;
