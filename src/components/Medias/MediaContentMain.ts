import { News } from "@/models/News";
import styles from "./MediaContentMain.module.css";
import typoStyles from "@/styles/typo.module.css";
import { Div, H2, Img, Li, Ul } from "@/libs/Elements";
import { Media } from "@/models/Media";
interface MediaContentMainProps {
  newsList: News[];
  media: Media;
}
export const MediaContentMain = ({
  newsList,
  media,
}: MediaContentMainProps) => {
  const preparedNewsList = newsList.slice(1, 7);
  return Div({
    className: `${styles.container}`,
    children: [
      Div({
        className: `${styles["main-news-box"]}`,
        children: [
          Img({
            className: `${styles["main-news-img"]}`,
            src: newsList[0].imgSrc,
            alt: newsList[0].title,
          }),
          H2({
            children: [newsList[0].title],
            className: `${styles["main-news-title"]} ${typoStyles["available-medium16"]}`,
          }),
        ],
      }),
      Ul({
        className: `${styles["news-preview-box"]}`,
        children: [
          ...preparedNewsList.map((news) => {
            return Li({
              className: `${typoStyles["available-medium16"]} ${styles["news-preview"]}`,
              children: [news.title],
            });
          }),
          Li({
            className: `${typoStyles["display-medium14"]} ${styles["news-preview-sub"]}`,
            children: [`${media.name} 언론사에서 직접 편집한 뉴스입니다.`],
          }),
        ],
      }),
    ],
  });
};
