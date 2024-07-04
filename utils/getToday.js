export const getToday = () => {
  // 오늘 날짜를 가져오기
  const today = new Date();

  // 년도, 월, 일 가져오기
  const year = today.getFullYear();
  const month = today.getMonth() + 1; // 월은 0부터 시작하므로 +1
  const day = today.getDate();

  // 요일 배열 (일요일부터 시작)
  const daysOfWeek = [
    "일요일",
    "월요일",
    "화요일",
    "수요일",
    "목요일",
    "금요일",
    "토요일",
  ];
  const dayOfWeek = daysOfWeek[today.getDay()];

  // 월과 일이 두 자리가 되도록 0 채우기
  const paddedMonth = month.toString().padStart(2, "0");
  const paddedDay = day.toString().padStart(2, "0");

  // 포맷된 날짜 문자열 생성
  const formattedDate = `${year}. ${paddedMonth}. ${paddedDay}. ${dayOfWeek}`;
  return formattedDate;
};
