import { getAllCompany } from "@/apis/news";
import "./GridViewer.css";
import leftButton from "@/assets/icons/leftButton.png";
import rightButton from "@/assets/icons/rightButton.png";

function GridViewer({ $target, position = "beforeend" }) {
  this.$element = document.createElement("article");
  this.$element.className = "gridViewer";
  $target.insertAdjacentElement(position, this.$element);

  this.state = {
    companies: [],
    page: 0,
  };

  this.render();
  this.load();
}

GridViewer.prototype.setState = function ({ companies, page }) {
  this.state;
  this.state = {
    companies: companies ?? this.state.companies,
    page: page ?? this.state.page,
  };

  this.render();
};

GridViewer.prototype.load = async function () {
  const companies = await getAllCompany(this.state.page);

  this.setState({ companies });
};

GridViewer.prototype.render = function () {
  const idDarkMode = document.body.classList.contains("dark");
  const { companies, page } = this.state;

  this.$element.innerHTML = /* html */ `
    ${companies
      .map(
        ({ lightLogo, darkLogo }) => /* html */ `
      <div class="cell"><img src="${idDarkMode ? darkLogo : lightLogo}"/></div>
      `
      )
      .join("")}

    <button id="prevButton" class="newsButton prev${
      page === 0 ? " hide" : ""
    }"><img src="${leftButton}"/></button>
    <button id="nextButton" class="newsButton next"><img src="${rightButton}"/></button>
  `;
};

export default GridViewer;
