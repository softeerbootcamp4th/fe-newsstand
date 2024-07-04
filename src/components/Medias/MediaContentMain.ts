import { News } from "@/models/News";
import styles from "./MediaContentMain.module.css";
import typoStyles from "@/styles/typo.module.css";
import { Div, H2, H3, Img, Li, Ul } from "@/libs/Elements";
interface MediaContentMainProps {
  newsList: News[];
}
export const MediaContentMain = ({ newsList }: MediaContentMainProps) => {
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
          ...newsList.map((news) => {
            return Li({
              className: `${styles["news-preview"]}`,
              children: [news.title],
            });
          }),
        ],
      }),
    ],
  });
};
