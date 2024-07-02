import { Media } from "./models/Media";
import { News, RecentNewsList } from "./models/News";
import { getMediaById } from "./remotes/getMediaById";
import { getRecentNewsList } from "./remotes/getRecentNewsList";
import { init, useState } from "./main";
const getLocalDayOfWeek = (date: Date): string => {
  const days = ["일", "월", "화", "수", "목", "금", "토"];
  return days[date.getDay()];
};
const formatDate = (date: Date): string => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const dayOfWeek = getLocalDayOfWeek(date);
  return `${year}. ${month}. ${day}. ${dayOfWeek}요일`;
};
const Header = () => {
  const date = new Date();
  return `
    <header>
      <span>뉴스스탠드</span>
      <span>${formatDate(date)}</span>
    </header>
  `;
};

const RecentNews = ({ mediaId, news }: { mediaId: number; news: News }) => {
  const media = getMediaById(mediaId);
  return `<a href=${news.href}>
    <span>
    ${media.name}
    </span>
    <span>
    ${news.title}
    </span>
  </a>`;
};
const TopSection = () => {
  const recentNewsList: RecentNewsList[] = getRecentNewsList();
  return `
    <section>
      ${recentNewsList.map((news) => RecentNews(news)).join("")}
    </section>
  `;
};

const MediaList = () => {
  const mideas: Media[] = [];

  return `
    <div>

    </div>
  `;
};

export const App = () => {
  return `
    <div>
      ${Header()}
      ${TopSection()}
    </div>
  `;
};
