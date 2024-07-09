import { sleep } from "@/utils/sleep";

export const updateMediaSubscribe = async (
  mediaId: number,
  isSubscribed: boolean,
): Promise<void> => {
  await sleep();
  console.log(
    `updateMediaSubscribe: mediaId=${mediaId}, isSubscribed=${isSubscribed}`,
  );
  localStorage.setItem(`media-${mediaId}`, isSubscribed ? "true" : "false");
};
