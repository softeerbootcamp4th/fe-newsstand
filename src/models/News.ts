export interface News {
  href: string;
  imgSrc: string;
  title: string;
}

export type RecentNewsList = {
  mediaId: number;
  news: News;
};

export interface MediaRecentNewsList {
  data: News[];
}
