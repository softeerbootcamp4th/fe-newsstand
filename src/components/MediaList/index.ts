import { Media } from "../../models/Media";
import { MediaIdByCategories } from "../../models/Newsstand";
import { getMediaById } from "../../remotes/getMediaById";
import { getMediaRecentNewsList } from "../../remotes/getMediaRecentNewsList";

const AllMediaTab = () => {
  const mediaIdByCategories: MediaIdByCategories = [];

  const currentMediaIdAndCategory = mediaIdByCategories[0];
  const currentMedia = getMediaById(currentMediaIdAndCategory.mediaId);
  const recentNewsList = getMediaRecentNewsList(currentMedia.id);
  return `
    <nav>전체 언론사</nav>
  `;
};
export const MediaList = () => {
  const mideas: Media[] = [];

  return `
    <section>
      <header>
        <span>
          <nav>전체 언론사</nav>
          <nav>내가 구독한 언론사</nav>
        </span>
        <span>
          아이콘1
          아이콘2
        </span>
      </header>
    </section>
  `;
};
