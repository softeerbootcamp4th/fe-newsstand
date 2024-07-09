import { http } from "./fetch";

export const getBreakingNews = () => http.get("/breakingNews");

export const getNews = ({ category, company }) => {
  const params = new URLSearchParams();
  if (category !== undefined) params.set("category", category);
  if (company !== undefined) params.set("company", company);

  return http.get(`/news?${params.toString()}`);
};
