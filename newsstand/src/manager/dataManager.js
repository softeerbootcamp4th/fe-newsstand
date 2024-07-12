import TAB_NEWS_DATA from "../../data/tabNewsData.js";
import { StorageKey } from "../namespace/StorageKey.js";
import storageManager from "./localStorageManager.js";

export const DataManager = {
  getAllPressTabs() {
    const subscribedPressTabsString = storageManager.getStorage(StorageKey.SUBSCRIBED);
    const subscribedPressTabs = subscribedPressTabsString ? subscribedPressTabsString.split(',') : [];

    return TAB_NEWS_DATA.data.flatMap(tab => {
      return tab.newsTabs.map(newsTab => {
        const updatedTabData = newsTab.tabData.map(data => {
          return {
            ...data,
            subscribe: subscribedPressTabs.includes(data.mediaName.trim()) ? 'Y' : 'N'
          };
        });

        return {
          tabName: newsTab.tabName,
          tabData: updatedTabData
        };
      });
    });
  },

  getSubscribedPressTabs() {
    const tabs = this.getAllPressTabs();
    const subscribedPressTabsString = storageManager.getStorage(StorageKey.SUBSCRIBED);

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