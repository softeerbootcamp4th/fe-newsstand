const intervalManager = {
    timers: {}, // 타이머를 저장할 객체

    startTimer: (key, callback, interval) => {
        if (intervalManager.timers[key]) {
            clearInterval(intervalManager.timers[key].ref); // 이미 있는 타이머 중지
        }
        intervalManager.timers[key] = {
            ref: setInterval(callback, interval) // 새로운 타이머 시작
        };
    },

    stopTimer: (key) => {
        if (intervalManager.timers[key]) {
            clearInterval(intervalManager.timers[key].ref); // 타이머 중지
            delete intervalManager.timers[key]; // 객체에서 제거
        }
    },

    stopAllTimers: () => {
        for (let key in intervalManager.timers) {
            clearInterval(intervalManager.timers[key].ref); // 모든 타이머 중지
        }
        intervalManager.timers = {}; // 객체 초기화
    }
};

export default intervalManager;
