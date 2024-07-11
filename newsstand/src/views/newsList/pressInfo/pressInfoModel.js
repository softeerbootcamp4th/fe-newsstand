import globalState from '../../../app/GlobalState.js';

class PressInfoModel {
    constructor() {
        this.press = {};
    }

    setPress(press) {
        this.press = press;
    }

    getPress() {
        return this.press;
    }

    toggleSubscription() {
        this.press.subscribe = this.press.subscribe === 'Y' ? 'N' : 'Y';
    }
}

export default PressInfoModel;
