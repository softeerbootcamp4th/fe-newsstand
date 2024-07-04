import { useState } from "../../libs/createApp";
import { Div, Header, Section, Span } from "../../libs/Elements";
import { Media } from "../../models/Media";
import { MediaIdByCategories } from "../../models/Newsstand";
import { CategoryNav } from "./CategoryNav";
import { MediasContent } from "./MediasContent";

export const Medias = () => {
  const [currentCategory, setCurrentCategory] = useState<
    "전체 언론사" | "내가 구독한 언론사"
  >("Medias", "전체 언론사");

  const mediaIdByCategories: MediaIdByCategories = [
    {
      mediaIds: [1, 2, 3],
      category: {
        id: 1,
        name: "정치",
      },
    },
    {
      mediaIds: [1, 2, 3],
      category: {
        id: 2,
        name: "사회",
      },
    },
    {
      mediaIds: [1, 2, 3],
      category: {
        id: 3,
        name: "경제",
      },
    },
  ];

  const currentMediaIdsAndCategory = mediaIdByCategories[0];
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
              color: currentCategory === "전체 언론사" ? "blue" : "black",
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
                currentCategory === "내가 구독한 언론사" ? "blue" : "black",
            },
          }),
        ],
      }),
      Div({
        children: [
          ...mediaIdByCategories.map((mediaIdByCategory) => {
            return CategoryNav({
              currentMediaIdsAndCategory: mediaIdByCategory,
            });
          }),
        ],
      }),
      MediasContent({
        currentMediaIdsAndCategory: currentMediaIdsAndCategory,
      }),
    ],
  });
};
