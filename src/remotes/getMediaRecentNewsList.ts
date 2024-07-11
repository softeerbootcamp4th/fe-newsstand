import { News } from "@/models/News";
import { sleep } from "@/utils/sleep";

export const getMediaRecentNewsByCategory = async (
  mediaId: number,
  categoryId: number,
): Promise<News[]> => {
  await sleep();
  return [
    {
      title: `${mediaId} ${categoryId} 뉴스 test1`,
      href: "#",
      imgSrc: "https://picsum.photos/200",
    },
    {
      title: `${mediaId} ${categoryId} 뉴스 test2`,
      href: "#",
      imgSrc: "https://picsum.photos/200",
    },
    {
      title: `${mediaId} ${categoryId} 뉴스 test3`,
      href: "#",
      imgSrc: "https://picsum.photos/200",
    },
    {
      title: `${mediaId} ${categoryId} 뉴스 test4`,
      href: "#",
      imgSrc: "https://picsum.photos/200",
    },
    {
      title: `${mediaId} ${categoryId} 뉴스 test5`,
      href: "#",
      imgSrc: "https://picsum.photos/200",
    },
    {
      title: `${mediaId} ${categoryId} 뉴스 test6`,
      href: "#",
      imgSrc: "https://picsum.photos/200",
    },
  ];
};
