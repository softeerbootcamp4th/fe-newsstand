export function generateNewsList(container, media, news) {
  const list = document.createElement("li");
  list.classList.add("newsList");

  news.forEach((category) => {
    const ul = document.createElement("ul");
    ul.textContent = category;
    list.appendChild(ul);
  });

  const footer = document.createElement("ul");
  footer.classList.add("newsList_footer");
  footer.textContent = `${media} 언론사에서 직접 편집한 뉴스입니다.`;
  list.appendChild(footer);

  container.appendChild(list);
}
