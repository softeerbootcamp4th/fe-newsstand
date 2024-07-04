export function generateBanner(containerId, mediaContent, newsContent) {
  const container = document.getElementById(containerId);

  const banner = document.createElement("div");
  banner.classList.add("newsBanner");

  const media = document.createElement("p");
  media.classList.add("banner_media");
  const news = document.createElement("p");
  news.classList.add("banner_news");

  media.textContent = mediaContent;
  news.textContent = newsContent;

  banner.appendChild(media);
  banner.appendChild(news);

  container.appendChild(banner);
}
