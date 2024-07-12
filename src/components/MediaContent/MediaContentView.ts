import { Anchor, Div, Img, Span, cc } from "@/libs";
import styles from "./MediaContentView.module.css";

import { News } from "@/models/News";

import typoSyles from "@/styles/typo.module.css";
import { Media } from "@/models/Media";
const MainNews = ({ news }: { news: News }) => {
  return cc(Div, {
    className: styles["main-news-box"],
    children: [
      cc(Img, {
        className: styles.img,
        src: news.imgSrc,
        alt: news.title,
      }),
      cc(Anchor, {
        className: `${typoSyles["available-medium16"]} ${styles["news-title"]}`,
        children: [news.title],
        href: news.href,
      }),
    ],
  });
};

const SubNews = ({ newsList, media }: { newsList: News[]; media: Media }) => {
  return cc(Div, {
    className: styles["sub-news-box"],
    children: [
      ...newsList.map((news) => {
        return cc(Anchor, {
          className: `${typoSyles["available-medium16"]} ${styles["sub-news-title"]} ${styles["news-title"]}`,
          children: [news.title],
          href: news.href,
        });
      }),
      cc(Span, {
        className: `${typoSyles["display-medium14"]} ${styles["news-info"]}`,
        children: [`${media.name} 언론사에서 직접 편집한 뉴스입니다.`],
      }),
    ],
  });
};

interface MediaContentViewProps {
  newsList: News[] | null;
  media: Media | null;
}
export const MediaContentView = ({
  newsList,
  media,
}: MediaContentViewProps) => {
  if (newsList == null || media == null) {
    return null;
  }
  const mainNews = newsList[0];
  const subNews = newsList.slice(1, 6);
  return cc(Div, {
    className: styles.container,
    children: [
      cc(MainNews, {
        news: mainNews,
      }),
      cc(SubNews, {
        newsList: subNews,
        media,
      }),
    ],
  });
};
