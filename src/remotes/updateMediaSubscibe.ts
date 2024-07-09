import { sleep } from "@/utils/sleep";

export const updateMediaSubscribe = async (
  mediaId: number,
  isSubscribed: boolean,
): Promise<void> => {
  await sleep();
  localStorage.setItem(`media-${mediaId}`, isSubscribed ? "true" : "false");
};
