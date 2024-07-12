//로컬스토리지에서 구독된 언론사를 받아오는 함수
export const getSubscribedData = () => {
  const subscribedData = localStorage.getItem("subscribed");
  if (subscribedData) {
    return JSON.parse(subscribedData); // JSON 문자열을 배열로 변환
  } else {
    return []; // 로컬 스토리지에 데이터가 없으면 빈 배열 반환
  }
};

//로컬스토리지로 새로운 값 넣어주는 함수
export const addSubscribedData = (companyName) => {
  // 현재 구독 정보 가져오기
  let subscribedData = getSubscribedData();

  // 새로운 구독 정보 추가
  subscribedData.push(companyName);

  // 로컬스토리지에 배열 형식으로 저장
  localStorage.setItem("subscribed", JSON.stringify(subscribedData));
};

//구독 해지버튼을 누른 언론사를 로컬스토리지에서 삭제해주는 함수
export const removeSubscribedData = () => {
  const calcelText = document
    .getElementById("cancelAlertTop")
    .querySelector("p>strong").textContent;

  const cancelAlert = document.getElementById("cancelAlert");
  const subscribed = getSubscribedData();
  const currentIndex = subscribed.findIndex(
    (company) => company === calcelText
  );
  subscribed.splice(currentIndex, 1);
  localStorage.setItem("subscribed", JSON.stringify(subscribed));
  cancelAlert.classList.remove("show");
};
