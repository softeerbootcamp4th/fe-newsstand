import { useState } from "../../libs/createApp";
import { Header, Section, Span } from "../../libs/Elements";
import { Media } from "../../models/Media";
import { MediaIdByCategories } from "../../models/Newsstand";
import { getMediaById } from "../../remotes/getMediaById";
import { getMediaRecentNewsList } from "../../remotes/getMediaRecentNewsList";

const MediasContent = () => {
  const mediaIdByCategories: MediaIdByCategories = [
    {
      mediaId: 1,
      category: {
        id: 1,
        name: "정치",
      },
    },
  ];

  const currentMediaIdAndCategory = mediaIdByCategories[0];
  const currentMedia = getMediaById(currentMediaIdAndCategory.mediaId);
  const recentNewsList = getMediaRecentNewsList(currentMedia.id);
  return "";
};
export const Medias = () => {
  const [getCurrentCategory, setCurrentCategory] = useState<
    "전체 언론사" | "내가 구독한 언론사"
  >("전체 언론사");

  return Section({
    children: [
      Header({
        children: [
          Span({
            children: ["전체 언론사"],
            onClick: () => {
              setCurrentCategory("전체 언론사");
            },
            style: {
              cursor: "pointer",
              color: getCurrentCategory() === "전체 언론사" ? "blue" : "black",
            },
          }),
          Span({
            children: ["내가 구독한 언론사"],
            onClick: () => {
              setCurrentCategory("내가 구독한 언론사");
            },
            style: {
              cursor: "pointer",
              color:
                getCurrentCategory() === "내가 구독한 언론사"
                  ? "blue"
                  : "black",
            },
          }),
        ],
      }),
      MediasContent(),
    ],
  });
};
