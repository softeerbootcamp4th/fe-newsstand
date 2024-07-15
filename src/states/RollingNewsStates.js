import { States } from "./States.js";

/**
 * @class RollingNewsStates 
 * @classdesc 롤링 되는 뉴스 정보를 가지고 있는 State, 옵저버 패턴에서 Subject 역할
 */
class RollingNewsStates extends States {

    constructor({ rollingNewsData = {}, leftNewsIndex = 0, rightNewsIndex = 0, isLeftStopped = false, isRightStopped = false }) {
        super();
        this.rollingNewsData = rollingNewsData;
        this.leftNewsIndex = leftNewsIndex;
        this.rightNewsIndex = rightNewsIndex;
        this.isLeftStopped = isLeftStopped;
        this.isRightStopped = isRightStopped;
    }

    setInitialState() {
        this.notify({
            eventName: "init",
            ...this.#getRollingNewsStates(),
        })
    }

    setRollingNews(value) {
        if (value === "left") {
            this.leftNewsIndex = (this.leftNewsIndex + 1) % 10;
        } else {
            this.rightNewsIndex = (this.rightNewsIndex + 1) % 10;
        }
        this.notify({
            eventName: "newsRolledFinished",
            ...this.#getRollingNewsStates(),
        })
    }

    #getRollingNewsStates() {
        return {
            leftInfo: {
                hiddenTitle: this.rollingNewsData.left[this.leftNewsIndex + 1],
                title: this.rollingNewsData.left[this.leftNewsIndex],
                isStopped: this.isLeftStopped,
            },
            rightInfo: {
                hiddenTitle: this.rollingNewsData.right[this.rightNewsIndex + 1],
                title: this.rollingNewsData.right[this.rightNewsIndex],
                isStopped: this.isRightStopped,
            }
        }
    }
}

export { RollingNewsStates }