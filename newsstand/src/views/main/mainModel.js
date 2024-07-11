import TAB_NEWS_DATA from "../../../data/tabNewsData.js";

export default class MainModel {
  constructor() {
    this.isAllPress = true;
    this.isList = true;
  }

  createTabs() {
    let tabs = this.getAllPressTabs();
    let subscribedPress = this.getSubscribedPressTabs(tabs);

    tabs = this.isAllPress ? tabs : subscribedPress;
    return tabs;
  }

  getAllPressTabs() {
    const tabDataWithCounts = TAB_NEWS_DATA.data.flatMap((tab) => {
      return tab.newsTabs.map((newsTab) => {
        return {
          tabName: newsTab.tabName,
          tabData: newsTab.tabData,
        };
      });
    });

    return tabDataWithCounts;
  }

  // 데이터 매니저 따로 빼기
  getSubscribedPressTabs(tabs) {
    const subscribedPressTabsString = localStorage.getItem("subscribed");

    if (!subscribedPressTabsString) {
      console.log("no subscribed press");
      return [];
    }

    try {
      const subscribedPressTabs = subscribedPressTabsString.split(",");
      const newTabs = [];

      tabs.forEach((tab) => {
        const filteredTabData = tab.tabData.filter((data) => {
          return subscribedPressTabs.includes(data.mediaName.trim());
        });

        if (filteredTabData.length > 0) {
          filteredTabData.forEach((data) => {
            const newTab = {
              tabName: data.mediaName,
              tabData: [
                {
                  mediaName: data.mediaName,
                  sourceLogo: data.sourceLogo,
                  newsDate: data.newsDate,
                  subscribe: "Y",
                  mainNews: data.mainNews,
                  subNews: data.subNews,
                },
              ],
            };
            newTabs.push(newTab);
          });
        }
      });

      return newTabs;
    } catch (error) {
      console.error("Error parsing subscribed press tabs:", error);
      return [];
    }
  }

  setAllPress(newValue) {
    this.isAllPress = newValue;
  }

  setListView(newValue) {
    this.isList = newValue;
  }

  getState() {
    return {
      isAllPress: this.isAllPress,
      isList: this.isList,
    };
  }
}
