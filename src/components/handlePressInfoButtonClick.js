import { pressInfoButton } from "./button.js";
import { snackBar } from "./snackBar.js";
import { clickSubscribeNews } from "./clickSubscribeNews.js";
import { addSubscribedData } from "./subscribeData.js";

// 구독하기 버튼이나 해지하기 버튼 누른때 실행되는 함수
export const handlePressInfoButtonClick = (
  button,
  newsData,
  subscribedData,
  isList
) => {
  button.addEventListener("click", () => {
    const pressInfo = document.querySelector(".pressInfo");
    const leftButton = document.getElementById("leftButton");

    if (!subscribedData.includes(newsData.companyName)) {
      const pressInfoText = `
                  <img src="${newsData.companyIcon}">
                  <span class="display-medium12">${newsData.updatedDate}</span>
                  ${pressInfoButton("구독하기")}
              `;
      pressInfo.innerHTML = pressInfoText;
      snackBar("내가 구독한 언론사에 추가되었습니다.", isList);
      if (isList) {
        setTimeout(() => {
          clickSubscribeNews(newsData.companyName);
          leftButton.className = "show";
        }, 5000);
      } else {
        button.innerHTML = `<img src='../../images/closed.svg' alt='closed icon'/>
              <span>해지하기</span>`;
      }
      addSubscribedData(newsData.companyName);
    } else {
      const cancelAlert = document.getElementById("cancelAlert");
      const cancelText = document
        .getElementById("cancelAlertTop")
        .querySelector("p");
      cancelText.innerHTML = `<strong>${newsData.companyName}</strong>을/를<br>구독해지하시겠습니까?`;
      cancelAlert.className = "show";
    }
  });
};
