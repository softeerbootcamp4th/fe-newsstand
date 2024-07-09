const intervalManager = {
    intervalRef: null,

    startTimer: (callback, interval) => {
        intervalManager.stopTimer();
        intervalManager.intervalRef = setInterval(callback, interval);
    },

    stopTimer: () => {
        if (intervalManager.intervalRef) {
            clearInterval(intervalManager.intervalRef);
            intervalManager.intervalRef = null;
        }
    }
};

export default intervalManager;