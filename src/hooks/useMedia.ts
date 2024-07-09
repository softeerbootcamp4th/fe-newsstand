import { useEffect, useState } from "@/libs";
import { Media } from "@/models/Media";
import { getMediaById } from "@/remotes/getMediaById";

export const useMedia = (mediaId: number) => {
  const [media, setMedia] = useState<Media | null>(null);

  useEffect(() => {
    getMediaById(mediaId).then((data) => {
      setMedia(data);
    });
  }, [mediaId]);
  return [media, setMedia] as const;
};
