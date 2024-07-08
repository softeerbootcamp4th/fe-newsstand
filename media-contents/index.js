import { renderMediaFilter } from "./media-filter.js";
import { renderMediaDisplay } from "./media-display.js";

function initMediaContents() {
    /**
     * 언론사 필터 렌더링
     */
    renderMediaFilter();

    /**
     * 그리드/리스트 형식 렌더링
     */
    renderMediaDisplay();
}

initMediaContents();
