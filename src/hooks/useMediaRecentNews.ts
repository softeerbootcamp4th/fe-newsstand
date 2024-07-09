import { useState, useEffect } from "@/libs";
import { News } from "@/models/News";
import { getMediaRecentNewsByCategory } from "@/remotes/getMediaRecentNewsList";

export const useMediaRecentNews = (mediaId: number, categoryId: number) => {
  const [recentNews, setRecentNews] = useState<News[] | null>(null);
  useEffect(() => {
    const fetchRecentNews = async () => {
      const news = await getMediaRecentNewsByCategory(mediaId, categoryId);
      setRecentNews(news);
    };
    fetchRecentNews();
  }, [mediaId, categoryId]);
  return recentNews;
};
