import { deepFreeze } from "../utils/deepfreeze.js";

/**
 * Renderer에서 렌더를 허용할 이벤트 이름의 목록
 */
export const newsListEventNameList = deepFreeze(["clickCategory", "clickSubAll"]);