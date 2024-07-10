import { getAllCompany } from "@/apis/news";
import "./GridViewer.css";
import leftButton from "@/assets/icons/leftButton.png";
import rightButton from "@/assets/icons/rightButton.png";
import { COMPANIES_PER_PAGE } from "@/data/constants";

function GridViewer({ $target, position = "beforeend" }) {
  this.$element = document.createElement("article");
  this.$element.className = "gridViewer";
  $target.insertAdjacentElement(position, this.$element);

  this.state = {
    companies: [],
    start: 0,
    isLast: false,
  };

  this.render();
  this.load(this.state.start);

  this.$element.addEventListener("click", this.handleClick.bind(this));
}

GridViewer.prototype.setState = function ({ companies, start, isLast }) {
  this.state = {
    companies: companies ?? this.state.companies,
    start: start ?? this.state.start,
    isLast: isLast ?? this.state.isLast,
  };

  this.render();
};

GridViewer.prototype.handleClick = function (event) {
  const button = event.target.closest("button");

  if (button) {
    const { id } = button;

    if (id === "nextButton") {
      this.nextPage();

      return;
    }

    if (id === "prevButton") {
      this.prevPage();

      return;
    }
  }
};

GridViewer.prototype.nextPage = function () {
  this.load(this.state.start + COMPANIES_PER_PAGE);
};

GridViewer.prototype.prevPage = function () {
  this.load(this.state.start - COMPANIES_PER_PAGE);
};

GridViewer.prototype.load = async function (start) {
  const companies = await getAllCompany(start);

  const nextPage = await getAllCompany(start + COMPANIES_PER_PAGE);

  const isLast = nextPage.length < 1;

  this.setState({ companies, start, isLast });
};

GridViewer.prototype.render = function () {
  const idDarkMode = document.body.classList.contains("dark");
  const { companies, start, isLast } = this.state;

  this.$element.innerHTML = /* html */ `
    ${companies
      .map(
        ({ lightLogo, darkLogo }) => /* html */ `
      <div class="cell"><img src="${idDarkMode ? darkLogo : lightLogo}"/></div>
      `
      )
      .join("")}

    <button id="prevButton" class="newsButton prev${
      start === 0 ? " hide" : ""
    }"><img src="${leftButton}"/></button>
    <button id="nextButton" class="newsButton next${
      isLast ? " hide" : ""
    }"><img src="${rightButton}"/></button>
  `;
};

export default GridViewer;
