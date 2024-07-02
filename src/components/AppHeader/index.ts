import { formatDate } from "../../utils/formatDate";

export const AppHeader = () => {
  return `
    <header>
      <span>뉴스스탠드</span>
      <span>${formatDate(new Date())}</span>
    </header>
  `;
};
