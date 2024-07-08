import NewsList from "../newsList/newsList.js";
import PressMenu from "../pressMenu/pressMenu.js";
import TAB_NEWS_DATA from "../../../data/tabNewsData.js";

export const Main = () => {
  let isAllPress = true;
  let isList = true;

  let element = document.createElement("div");
  element.className = "main-container";

  function render() {
    const pressMenu = PressMenu({onToggleAllPress, onToggleListView});

    const html = ``;

    element.innerHTML = html;
    element.appendChild(pressMenu.element);

    const contentContainer = document.createElement("div");
    contentContainer.className = "main-content-container";
    element.appendChild(contentContainer);

    isList ? makeNewsList(contentContainer) : makePressGrid(contentContainer);
  }

  render();

  return {
    element,
  };

  function createTabs() {
    let tabs = isAllPress ? getAllPressTabs() : getSubscribedPressTabs();
    return tabs;
  }

  function makeNewsList(element) {
    element.innerHTML = "";

    const tabs = createTabs();
    const newsList = NewsList({tabs});

    element.appendChild(newsList.element);

    console.log("46");
  }

  function makePressGrid(element) {
    element.innerHTML = "";
    element.appendChild();

    console.log("53");
  }

  function getAllPressTabs() {
    const filteredTabNames = TAB_NEWS_DATA.data
      .map((tab) => {
        return tab.newsTabs.map((newsTab) => {
          return newsTab.tabName;
        });
      })
      .flat();

    return filteredTabNames;
  }

  function getSubscribedPressTabs() {
    const subscribedPressTabsString = localStorage.getItem("pressId");

    if (!subscribedPressTabsString) {
      console.log("no subscribed press");
      return [];
    }

    try {
      const subscribedPressTabsArray = JSON.parse(subscribedPressTabsString);
      return subscribedPressTabsArray;
    } catch (error) {
      console.error("Error parsing subscribed press tabs:", error);
      return [];
    }
  }

  function onToggleAllPress(newValue) {
    isAllPress = newValue;
    render();
  }

  function onToggleListView(newValue) {
    isList = newValue;
    console.log(isList);
    render();
  }
};

export default Main;
