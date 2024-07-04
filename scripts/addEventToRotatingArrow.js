import { handleCompanySwipe } from "./swiper.js";
export function addEventToRotatingArrow(state) {
    document.querySelector(".right_arrow").addEventListener("click",function() {
        handleCompanySwipe(state,"right");
    });
    document.querySelector(".left_arrow").addEventListener("click",function() {
        handleCompanySwipe(state,"left");
    });
}