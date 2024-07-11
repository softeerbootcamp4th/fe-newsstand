import { renderMediaFilter } from "./media-filter.js";
import { renderGridLayout, renderMediaDisplay } from "./media-display.js";
import { getMediaData } from "./get-data.js";

function initMediaContents() {
    /**
     * 데이터 패치
     */
    getMediaData();

    /**
     * 언론사 필터 렌더링
     */
    renderMediaFilter();

    /**
     * 그리드/리스트 형식 렌더링
     */
    renderMediaDisplay();

    /**
     * 그리드 레이아웃 렌더링
     */
    renderGridLayout();
}

initMediaContents();
