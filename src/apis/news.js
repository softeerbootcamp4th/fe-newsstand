import { http } from "./fetch";

export const getBreakingNews = () => http.get("/breakingNews");

export const getNews = ({ category, companyId }) => {
  const params = new URLSearchParams();
  if (category !== undefined) params.set("category", category);
  if (companyId !== undefined) params.set("id", companyId);

  return http.get(`/news?${params.toString()}`);
};

export const getAllCompany = (page) => {
  const params = new URLSearchParams({ _start: page, _limit: 24 });

  return http.get(`/companies?${params.toString()}`);
};
