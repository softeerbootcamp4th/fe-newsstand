import { StorageKey } from "../namespace/StorageKey.js";

const storageManager = {
    getStorage: (key) => {
        return localStorage.getItem(key)
    },

    setStorage: (key, value) => {
        if (key == StorageKey.SUBSCRIBED) {
            value = storageManager.makeNewSubscribeList(key, value);
        }

        localStorage.setItem(key, value)
    },

    makeNewSubscribeList: (key, value) => {
        let subscribedPress = storageManager.getStorage(key);

        let subscribedSet = new Set();
        if (subscribedPress) {
            subscribedSet = new Set(subscribedPress.split(","));
        }
        subscribedSet.add(value);

        return Array.from(subscribedSet).join(",")
    }
};

export default storageManager;