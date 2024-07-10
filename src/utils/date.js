export function formatDate(date) {
  const daysOfWeek = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  const dayOfWeek = daysOfWeek[date.getDay()];

  return `${year}. ${month}. ${day}. ${dayOfWeek}`;
}