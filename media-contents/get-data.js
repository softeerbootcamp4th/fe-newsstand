import { mediaDetail } from '../store/media-detail.js';
import { mediaList } from '../store/media-list.js';
import { getData } from '../utils/fetch.js';
import { shuffleList } from '../utils/shuffle-list.js';

/**
 * @description 데이터를 패치하는 함수
 */
export async function getMediaData() {
    /**
     * media 목록
     */
    const mediaListData = await getData('../static/data/media.json');
    const shuffledMediaList = shuffleList(mediaListData.data.slice());
    mediaList.setData(shuffledMediaList);

    /**
     * media 상세 콘텐츠
     */
    const mediaDetailData = await getData('../static/data/media-detail.json');
    mediaDetail.setData(mediaDetailData.data);
}
