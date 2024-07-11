import TAB_NEWS_DATA from "../../data/tabNewsData.js";

export const DataManager = {
  getAllPressTabs() {
    return TAB_NEWS_DATA.data.flatMap(tab => {
      return tab.newsTabs.map(newsTab => {
        return {
          tabName: newsTab.tabName,
          tabData: newsTab.tabData
        };
      });
    });
  },

  getSubscribedPressTabs() {
    const tabs = this.getAllPressTabs()
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
                mainNews: data.mainNews,
                subNews: data.subNews
              }]
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
};

export default DataManager;