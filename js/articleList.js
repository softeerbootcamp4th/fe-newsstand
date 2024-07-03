export const articleList = () => {
  const articles = [
    "사용후핵연료 저장시설 포화…이대론 7년 뒤 원전 멈춘다",
    "사용후핵연료 저장시설 포화…이대론 7년 뒤 원전 멈춘다",
    "사용후핵연료 저장시설 포화…이대론 7년 뒤 원전 멈춘다",
    "사용후핵연료 저장시설 포화…이대론 7년 뒤 원전 멈춘다",
    "사용후핵연료 저장시설 포화…이대론 7년 뒤 원전 멈춘다",
  ];

  const listElement = document.getElementById("news-list__articles");

  articles.forEach((article) => {
    const listItem = document.createElement("a");
    listItem.textContent = article;
    listItem.href = "#";
    listItem.className = "article-link";
    listElement.appendChild(listItem);
  });
};
