import news from "./news.json";

export function getMockNews(companyId) {
  const newsString = JSON.stringify(news);

  const data = JSON.parse(newsString.replaceAll("연합뉴스", "OO뉴스"));

  const idString = companyId.toString().padStart(3, "0");

  data.id = companyId;
  data.lightLogo = `https://s.pstatic.net/static/newsstand/2020/logo/light/0604/${idString}.png`;
  data.darkLogo = `https://s.pstatic.net/static/newsstand/2020/logo/dark/0604/${idString}.png`;

  return [data];
}
