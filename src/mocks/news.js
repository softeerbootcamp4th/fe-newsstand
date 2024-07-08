import news from "./data/news.json";

export const CATEGORIES = [
  "종합/경제",
  "방송/통신",
  "IT",
  "영자지",
  "스포츠/연예",
  "매거진/전문지",
  "지역",
];

export function getNews({ category, company }) {
  let newsList = news;

  if (category !== undefined) {
    newsList = newsList.filter((ele) => ele.category === category);
  }

  if (company !== undefined) {
    newsList = newsList.filter((ele) => ele.company === company);
  }

  return newsList;
}
