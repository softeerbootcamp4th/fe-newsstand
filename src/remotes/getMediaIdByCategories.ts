import { MediaIdByCategories } from "@/models/Newsstand";
import { sleep } from "@/utils/sleep";

export const getMediaIdByCategories =
  async (): Promise<MediaIdByCategories> => {
    await sleep();
    return [
      {
        mediaIds: [1, 2, 3],
        category: {
          id: 1,
          name: "종합/경제",
        },
      },
      {
        mediaIds: [4, 5, 6],
        category: {
          id: 2,
          name: "방송/통신",
        },
      },
      {
        mediaIds: [7, 8, 9],
        category: {
          id: 3,
          name: "IT",
        },
      },
      {
        mediaIds: [10, 11, 12],
        category: {
          id: 4,
          name: "영자지",
        },
      },
      {
        mediaIds: [13, 14, 15],
        category: {
          id: 5,
          name: "스포츠/연예",
        },
      },
      {
        mediaIds: [16, 17, 18],
        category: {
          id: 6,
          name: "매거진/전문지",
        },
      },
      {
        mediaIds: [19, 20, 21],
        category: {
          id: 7,
          name: "지역",
        },
      },
      {
        mediaIds: [22, 23, 24],
        category: {
          id: 8,
          name: "8번 카테고리",
        },
      },
      {
        mediaIds: [25, 26, 27],
        category: {
          id: 9,
          name: "9번 카테고리",
        },
      },
      {
        mediaIds: [28, 29, 30],
        category: {
          id: 10,
          name: "10번 카테고리",
        },
      },
      {
        mediaIds: [31, 32, 33],
        category: {
          id: 11,
          name: "11번 카테고리",
        },
      },
    ];
  };
