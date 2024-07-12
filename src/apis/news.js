import { getMockNews } from "@/data/mocks/news";
import { http } from "./fetch";

export const getBreakingNews = () => http.get("/breakingNews");

export const getNews = async ({ category, companyId }) => {
  const params = new URLSearchParams();
  if (category !== undefined) params.set("category", category);
  if (companyId !== undefined) params.set("id", companyId);

  const news = await http.get(`/news?${params.toString()}`);

  if (!news || news.length < 1) {
    return getMockNews(companyId);
  }

  return news;
};

export const getAllCompany = (page) => {
  const params = new URLSearchParams({ _start: page, _limit: 24 });

  return http.get(`/companies?${params.toString()}`);
};
