class DarkMode {
    constructor() {
        this.isDarkMode = false;
        this.callback = {};
    }

    addCallback(id, callback) {
        this.callback[id] = callback;
    }
    toggleMode() {
        this.isDarkMode = !this.isDarkMode;
        Object.values(this.callback).forEach((_callback) => _callback());
    }
}

const darkMode = new DarkMode();
export { darkMode };