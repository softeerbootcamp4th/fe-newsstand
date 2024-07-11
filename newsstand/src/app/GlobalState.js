import DataManager from "../manager/dataManager.js";

class GlobalState {
    constructor() {
        this.state = {
            isAllPress: true,
            isGridView: true,
            tabFields: DataManager.getAllPressTabs(),
            selectedCategoryIndex: 0,
            selectedCategoryCountIndex: 0
        };
        this.listeners = {};
    }

    getState(key) {
        return this.state[key];
    }

    setState(key, value) {
        this.state[key] = value;
        this.notifyListeners(key, value);
    }

    subscribe(key, listener) {
        if (!this.listeners[key]) {
            this.listeners[key] = [];
        }
        this.listeners[key].push(listener);
    }

    unsubscribe(key, listener) {
        if (!this.listeners[key]) return;

        const index = this.listeners[key].indexOf(listener);
        if (index > -1) {
            this.listeners[key].splice(index, 1);
        }
    }

    notifyListeners(key, value) {
        if (!this.listeners[key]) return;
        this.listeners[key].forEach(listener => {
            listener(value)
        });
    }
}

const globalState = new GlobalState();
export default globalState;
