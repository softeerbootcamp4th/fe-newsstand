import { DIRECTION } from "./magicValues.js";
import { handleCompanySwipe } from "./swiper.js";
export function addEventToRotatingArrow(state) {
    setInterval(function() {
        handleCompanySwipe(state,DIRECTION.RIGHT);
    },1000*1);
    document.querySelector(".right_arrow").addEventListener("click",function() {
        handleCompanySwipe(state,DIRECTION.RIGHT);
    });
    document.querySelector(".left_arrow").addEventListener("click",function() {
        handleCompanySwipe(state,DIRECTION.LEFT);
    });
}