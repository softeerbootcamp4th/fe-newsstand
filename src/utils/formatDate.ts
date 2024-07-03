const getLocalDayOfWeek = (date: Date): string => {
  const days = ["일", "월", "화", "수", "목", "금", "토"];
  return days[date.getDay()];
};
export const formatDate = (date: Date): string => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const dayOfWeek = getLocalDayOfWeek(date);
  return `${year}. ${month}. ${day}. ${dayOfWeek}요일`;
};
