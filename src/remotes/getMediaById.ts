import { sleep } from "@/utils/sleep";
import { Media } from "../models/Media";

const mediaData: Omit<Media, "isSubscribed">[] = [
  {
    id: 1,
    name: "연합뉴스",
    imgSrc: "/images/yonhapNews.png",
    lastEdited: "2024-07-03T01:10:00Z",
  },
  {
    id: 2,
    name: "서울경제",
    imgSrc: "/images/seoulEconomic.png",
    lastEdited: "2024-07-04T01:10:00Z",
  },
  {
    id: 3,
    name: "데일리한국",
    imgSrc: "/images/dailyKorea.png",
    lastEdited: "2024-07-04T01:10:00Z",
  },
  {
    id: 4,
    name: "파이낸스",
    imgSrc: "/images/finance.png",
    lastEdited: "2024-07-04T01:10:00Z",
  },
  {
    id: 5,
    name: "아이뉴스",
    imgSrc: "/images/iNews.png",
    lastEdited: "2024-07-04T01:10:00Z",
  },
  {
    id: 6,
    name: "시사위크",
    imgSrc: "/images/sisajounalE.png",
    lastEdited: "2024-07-04T01:10:00Z",
  },
  {
    id: 7,
    name: "엑스포츠",
    imgSrc: "/images/ecSportsNews.png",
    lastEdited: "2024-07-04T01:10:00Z",
  },
  {
    id: 8,
    name: "KNN",
    imgSrc: "/images/KNN.png",
    lastEdited: "2024-07-04T01:10:00Z",
  },
  {
    id: 9,
    name: "국민일보",
    imgSrc: "/images/koockminNews.png",
    lastEdited: "2024-07-04T01:10:00Z",
  },
  {
    id: 10,
    name: "매일경제",
    imgSrc: "/images/mailEconomic.png",
    lastEdited: "2024-07-04T01:10:00Z",
  },
  {
    id: 11,
    name: "MBN",
    imgSrc: "/images/MBN.png",
    lastEdited: "2024-07-04T01:10:00Z",
  },
  {
    id: 12,
    name: "마이데일리",
    imgSrc: "/images/mydaily.png",
    lastEdited: "2024-07-04T01:10:00Z",
  },
  {
    id: 13,
    name: "뉴데일리",
    imgSrc: "/images/newDaily.png",
    lastEdited: "2024-07-04T01:10:00Z",
  },
  {
    id: 14,
    name: "OBS",
    imgSrc: "/images/OBS.png",
    lastEdited: "2024-07-04T01:10:00Z",
  },
  {
    id: 15,
    name: "Digital Today",
    imgSrc: "/images/digitalToday.png",
    lastEdited: "2024-07-04T01:10:00Z",
  },
  {
    id: 16,
    name: "SBSBiz",
    imgSrc: "/images/SBSBiz.png",
    lastEdited: "2024-07-04T01:10:00Z",
  },
  {
    id: 17,
    name: "헤럴드 경제",
    imgSrc: "/images/HEconimic.png",
    lastEdited: "2024-07-04T01:10:00Z",
  },
  {
    id: 18,
    name: "스포츠동아",
    imgSrc: "/images/sportsDonga.png",
    lastEdited: "2024-07-04T01:10:00Z",
  },
  {
    id: 19,
    name: "스포츠뉴스",
    imgSrc: "/images/sportsNews.png",
    lastEdited: "2024-07-04T01:10:00Z",
  },
  {
    id: 20,
    name: "MKSports",
    imgSrc: "/images/MKSports.png",
    lastEdited: "2024-07-04T01:10:00Z",
  },
  {
    id: 21,
    name: "세계뉴스",
    imgSrc: "/images/worldNews.png",
    lastEdited: "2024-07-04T01:10:00Z",
  },
  {
    id: 22,
    name: "ZNDETKorea",
    imgSrc: "/images/ZNDETKorea.png",
    lastEdited: "2024-07-04T01:10:00Z",
  },
  {
    id: 23,
    name: "전자뉴스",
    imgSrc: "/images/junjaNews.png",
    lastEdited: "2024-07-04T01:10:00Z",
  },
  {
    id: 24,
    name: "에너지경제",
    imgSrc: "/images/energyEconomy.png",
    lastEdited: "2024-07-04T01:10:00Z",
  },
  {
    id: 25,
    name: "일간스포츠",
    imgSrc: "/images/ilganSports.png",
    lastEdited: "2024-07-04T01:10:00Z",
  },
  {
    id: 26,
    name: "데일리안",
    imgSrc: "/images/dailyAn.png",
    lastEdited: "2024-07-04T01:10:00Z",
  },
  {
    id: 27,
    name: "YTN",
    imgSrc: "/images/YTN.png",
    lastEdited: "2024-07-04T01:10:00Z",
  },
  {
    id: 28,
    name: "동아일보",
    imgSrc: "/images/DonaANews.png",
    lastEdited: "2024-07-04T01:10:00Z",
  },
  {
    id: 29,
    name: "텐아시아",
    imgSrc: "/images/10Asia.png",
    lastEdited: "2024-07-04T01:10:00Z",
  },
  {
    id: 30,
    name: "SBS",
    imgSrc: "/images/SBS.png",
    lastEdited: "2024-07-04T01:10:00Z",
  },
  {
    id: 31,
    name: "서울신문",
    imgSrc: "/images/seoulNews.png",
    lastEdited: "2024-07-04T01:10:00Z",
  },
  {
    id: 32,
    name: "조선Biz",
    imgSrc: "/images/chosunBiz.png",
    lastEdited: "2024-07-04T01:10:00Z",
  },
  {
    id: 33,
    name: "조이뉴스24",
    imgSrc: "/images/joyNews24.png",
    lastEdited: "2024-07-04T01:10:00Z",
  },
  {
    id: 34,
    name: "TV리포트",
    imgSrc: "/images/TVReport.png",
    lastEdited: "2024-07-04T01:10:00Z",
  },
  {
    id: 35,
    name: "e데일리",
    imgSrc: "/images/eDaily.png",
    lastEdited: "2024-07-04T01:10:00Z",
  },
];

export const getMediaById = async (mediaId: number): Promise<Media> => {
  await sleep();

  const isSubscribed = localStorage.getItem(`media-${mediaId}`) === "true";
  const curMedia = mediaData.find((media) => media.id === mediaId)!;
  return {
    ...curMedia,
    isSubscribed,
  };
};
