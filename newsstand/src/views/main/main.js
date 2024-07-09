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
    let tabs = getAllPressTabs();
    let subscribedPress = getSubscribedPressTabs(tabs);

    tabs = isAllPress ? tabs : subscribedPress;
    return tabs;
  }

  function makeNewsList(element) {
    element.innerHTML = "";

    const tabs = createTabs();
    const newsList = NewsList({isAllPress, tabs});

    element.appendChild(newsList.element);
  }

  function makePressGrid(element) {
    element.innerHTML = "";
    element.appendChild();
  }

  function getAllPressTabs() {
    const tabDataWithCounts = TAB_NEWS_DATA.data.flatMap((tab) => {
      return tab.newsTabs.map((newsTab) => {
        return {
          tabName: newsTab.tabName,
          tabData: newsTab.tabData
        };
      });
    });
  
    return tabDataWithCounts;
  }
  
  function getSubscribedPressTabs(tabs) {
    const subscribedPressTabsString = localStorage.getItem("subscribed");

    if (!subscribedPressTabsString) {
        console.log("no subscribed press");
        return [];
    }

    try {
        const subscribedPressTabs = subscribedPressTabsString.split(',');
        const newTabs = [];

        tabs.forEach(tab => {
          const filteredTabData = tab.tabData.filter(data => {
              return subscribedPressTabs.includes(data.mediaName.trim());
          });

          if (filteredTabData.length > 0) {
              filteredTabData.forEach(data => {
                  const newTab = {
                      tabName: data.mediaName,
                      tabData: [{
                          mediaName: data.mediaName,
                          sourceLogo: data.sourceLogo,
                          newsDate: data.newsDate,
                          subscribe: 'Y',
                          mainNews: data.mainNews // Assuming mainNews is an object
                      }]
                  };
                  newTabs.push(newTab);
              });
          }
      });
        console.log(newTabs);
        return newTabs;
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
    render();
  }
};

export default Main;
