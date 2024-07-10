import { getDate } from "../../utils/utils.js";

export const HeaderContainer = (handleReload) => {
  let element = document.createElement("div");
  element.className = "header-container";
  
  function render() {
    const html = `
        <div class="logo-container" id="logo-container">
            <img src="../../assets/icons/newspaper.svg" alt="newspaper icon">
            <span class="logo-label">뉴스스탠드</span>
        </div>
        <div class="day-label">${getDate()}</div>
    `;

    element.innerHTML = html;
  }

  function addEventListeners() {
    const logoContainer = element.querySelector("#logo-container");

    if (logoContainer) {
      logoContainer.addEventListener("click", handleReload);
    }
  }

  render();
  addEventListeners()

  return {
    element,
  };
};

export default HeaderContainer;
