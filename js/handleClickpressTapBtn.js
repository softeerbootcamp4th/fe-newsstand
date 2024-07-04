import { changeFieldTab } from "./changeFieldTab.js";

(() => {
  const PressTabBtn = document.querySelectorAll(".press-tab-btn");

  for (let i = 0; i < PressTabBtn.length; i++) {
    PressTabBtn[i].addEventListener("click", () => {
      // 기존의 active들을 모두 제거
      for (let j = 0; j < PressTabBtn.length; j++)
        PressTabBtn[j].classList.remove("active");

      // 선택한 버튼에 active 달아주기
      PressTabBtn[i].classList.add("active");
      changeFieldTab(i);
    });
  }
})();
