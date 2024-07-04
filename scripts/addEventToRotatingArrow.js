import { handleCompanySwipe } from "./swiper.js";
export function addEventToRotatingArrow(state) {
    setInterval(function() {
        handleCompanySwipe(state,"right");
    },1000*1);
    document.querySelector(".right_arrow").addEventListener("click",function() {
        handleCompanySwipe(state,"right");
    });
    document.querySelector(".left_arrow").addEventListener("click",function() {
        handleCompanySwipe(state,"left");
    });
}