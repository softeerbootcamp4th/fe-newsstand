import { useState } from "../../libs/createApp";
import { Div, Header, Section, Span } from "../../libs/Elements";
import { MediaIdByCategories } from "../../models/Newsstand";
import { CategoryNav } from "./CategoryNav";
import { MediasContent } from "./MediasContent";

interface CurrentCategoryTogglerProps {
  currentFilter: "전체 언론사" | "내가 구독한 언론사";
  setCurrentFilter: (category: "전체 언론사" | "내가 구독한 언론사") => void;
}
export const CurrentFilterToggler = ({
  currentFilter,
  setCurrentFilter,
}: CurrentCategoryTogglerProps) => {
  return Header({
    children: [
      Span({
        children: ["전체 언론사"],
        onClick: () => {
          setCurrentFilter("전체 언론사");
        },
        style: {
          cursor: "pointer",
          color: currentFilter === "전체 언론사" ? "blue" : "black",
        },
      }),
      Span({
        children: ["내가 구독한 언론사"],
        onClick: () => {
          setCurrentFilter("내가 구독한 언론사");
        },
        style: {
          cursor: "pointer",
          color: currentFilter === "내가 구독한 언론사" ? "blue" : "black",
        },
      }),
    ],
  });
};

export const Medias = () => {
  const [currentFilter, setCurrentFilter] = useState<
    "전체 언론사" | "내가 구독한 언론사"
  >({
    key: "Medias",
    initalState: "전체 언론사",
  });

  const [currentCategoryIdx, setCurrentCategoryIdx] = useState({
    key: "Medias",
    initalState: 0,
  });

  const [currentMediaIdx, setCurrentMediaIdx] = useState({
    key: "Medias",
    initalState: 0,
  });

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

  const handleMediaNext = () => {
    if (
      currentMediaIdx ===
      mediaIdByCategories[currentCategoryIdx].mediaIds.length - 1
    ) {
      setCurrentMediaIdx(0);
      setCurrentCategoryIdx(currentCategoryIdx + 1);
      return;
    }
    setCurrentMediaIdx(currentMediaIdx + 1);
  };
  const currentMediaIdsAndCategory = mediaIdByCategories[currentCategoryIdx];
  return Section({
    children: [
      CurrentFilterToggler({
        currentFilter: currentFilter,
        setCurrentFilter: setCurrentFilter,
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
        currentMediaIdx: currentMediaIdx,
        handleMediaNext,
      }),
    ],
  });
};
