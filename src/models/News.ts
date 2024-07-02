export interface News {
  href: string;
  imgSrc: string;
  title: string;
}

export interface RecentNewsList {
  data: {
    mediaId: number;
    news: News;
  }[];
}

export interface MediaRecentNewsList {
  data: News[];
}
