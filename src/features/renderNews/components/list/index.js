import { MainNewsState } from "../../../../types/news.js";
import { createTab } from "./tab/tab.js";
import { createCompany } from "./company/company.js";

/**
 *
 * @param {HTMLElement} container
 * @param {MainNewsState} state
 */
export function renderListView(container, state) {
  const currentCompany =
    state.currentDataType === "all-news-tab"
      ? state.data[state.currentCategoryIndex]?.companies[state.currentCompanyIndex]
      : state.data[state.currentCompanyIndex];

  if (currentCompany) {
    // 언론사 카테고리
    container.appendChild(createTab(state));
    // 언론사
    container.appendChild(createCompany(currentCompany));
  }
}
