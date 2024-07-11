import { mediaList } from '../store/media-list.js';
import { getData } from '../utils/fetch.js';
import { shuffleList } from '../utils/shuffle-list.js';

/**
 * @description 데이터를 패치하는 함수
 */
export async function getMediaData() {
    const mediaListData = await getData('../static/data/media.json');
    const shuffledMediaList = shuffleList(mediaListData.data.slice());
    mediaList.setData(shuffledMediaList);
}
