export interface News {
  href: string;
  imgSrc: string;
  title: string;
}

export type RecentNews = {
  mediaId: number;
  news: News;
};
