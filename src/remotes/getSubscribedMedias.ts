import { sleep } from "@/utils/sleep";
import { mediaData } from "./getMediaById";
import { MediaIdByCategories } from "@/models/Newsstand";

export const getSubscribedMedias = async (): Promise<MediaIdByCategories> => {
  const medias = mediaData.filter((media) => {
    const isSubscribed = localStorage.getItem(`media-${media.id}`) === "true";
    return isSubscribed;
  });
  await sleep();
  return medias.map((media) => {
    return {
      mediaIds: [media.id],
      category: {
        id: media.id,
        name: media.name,
      },
    };
  });
};
