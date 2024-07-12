const intervalManager = {
    timers: {},

    startTimer: (key, callback, interval) => {
        if (intervalManager.timers[key]) {
            clearInterval(intervalManager.timers[key].ref);
        }
        intervalManager.timers[key] = {
            ref: setInterval(callback, interval)
        };
    },

    stopTimer: (key) => {
        if (intervalManager.timers[key]) {
            clearInterval(intervalManager.timers[key].ref);
            delete intervalManager.timers[key];
        }
    },

    stopAllTimers: () => {
        for (let key in intervalManager.timers) {
            clearInterval(intervalManager.timers[key].ref);
        }
        intervalManager.timers = {};
    }
};

export default intervalManager;
