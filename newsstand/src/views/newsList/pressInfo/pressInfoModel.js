import globalState from '../../../app/GlobalState.js';

class PressInfoModel {
    constructor() {
        this.state = {
            press: {}
        };
    }

    setPress(press) {
        this.state.press = press;
    }

    getPress() {
        return this.state.press;
    }


    getState() {
        return this.state;
    }

    setState(newState) {
        this.state = { ...this.state, ...newState };

    }
    toggleSubscription() {
        this.state.press.subscribe = this.state.press.subscribe === 'Y' ? 'N' : 'Y';
    }
}

export default PressInfoModel;
