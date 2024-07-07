export function generateBanner(container, content) {
  const listContainer = document.createElement("div");
  listContainer.classList.add("listContainer");
  container.appendChild(listContainer);

  const bannerList = document.createElement("ul");
  bannerList.classList.add("bannerList");
  listContainer.appendChild(bannerList);

  content.news.forEach((element) => {
    const elementContainer = document.createElement("li");
    const media = document.createElement("p");
    media.classList.add("banner_media");
    const news = document.createElement("p");
    news.classList.add("banner_news");

    media.textContent = content.media;
    news.textContent = element;

    elementContainer.appendChild(media);
    elementContainer.appendChild(news);

    bannerList.appendChild(elementContainer);
  });

  bannerList.children[0].classList.add("prev");
  bannerList.children[1].classList.add("current");
  bannerList.children[2].classList.add("next");
}
