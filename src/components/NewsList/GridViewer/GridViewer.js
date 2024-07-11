import { getAllCompany } from "@/apis/news";
import "./GridViewer.css";
import leftButton from "@/assets/icons/leftButton.png";
import rightButton from "@/assets/icons/rightButton.png";
import { COMPANIES_PER_PAGE } from "@/data/constants";
import Button from "@/components/common/Button/Button";
import { addCompany, isSubscribeCompany, removeCompany } from "@/data/storageHandler";

function GridViewer({ $target, position = "beforeend", changeTab, filter = "category" }) {
  this.$element = document.createElement("article");
  this.$element.className = "gridViewer";
  $target.insertAdjacentElement(position, this.$element);

  this.props = {
    changeTab,
    filter,
  };

  this.state = {
    companies: [],
    start: 0,
    isLast: false,
  };

  this.render();
  this.load(this.state.start);

  this.components = {
    SubscribeButtons: [],
    UnsubscribeButtons: [],
  };

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
  const $button = event.target.closest("button");

  if ($button) {
    const { id, classList } = $button;
    const {
      dataset: { companyId, companyName },
    } = $button.closest("li");

    if (id === "nextButton") {
      this.nextPage();

      return;
    }

    if (id === "prevButton") {
      this.prevPage();

      return;
    }

    if (classList.contains("subscribe")) {
      const company = this.state.companies.find(
        (company) => Number(company.id) === Number(companyId)
      );

      this.subscribeCompany({
        id: companyId,
        company: companyName,
        lightLogo: company.lightLogo,
        darkLogo: company.darkLogo,
      });

      return;
    }

    if (classList.contains("unsubscribe")) {
      this.unsubscribeCompany({ id: companyId });

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
  this.renderSubscribeButtons();
};

GridViewer.prototype.subscribeCompany = function ({ id, company, lightLogo, darkLogo }) {
  addCompany({ id, company, lightLogo, darkLogo });

  this.showUnsubscribeButton(id);
};

GridViewer.prototype.unsubscribeCompany = function ({ id }) {
  removeCompany({ id });

  this.showSubscribeButton(id);
};

GridViewer.prototype.showSubscribeButton = function (companyId) {
  const $listItem = this.$element.querySelector(`li[data-company-id="${companyId}"]`);

  const $subscribeButton = $listItem.querySelector(`button.subscribe`);
  const $unsubscribeButton = $listItem.querySelector(`button.unsubscribe`);

  $subscribeButton.classList.remove("hide");
  $unsubscribeButton.classList.add("hide");
};

GridViewer.prototype.showUnsubscribeButton = function (companyId) {
  const $listItem = this.$element.querySelector(`li[data-company-id="${companyId}"]`);

  const $subscribeButton = $listItem.querySelector(`button.subscribe`);
  const $unsubscribeButton = $listItem.querySelector(`button.unsubscribe`);

  $subscribeButton.classList.add("hide");
  $unsubscribeButton.classList.remove("hide");
};

GridViewer.prototype.render = function () {
  const idDarkMode = document.body.classList.contains("dark");
  const { companies, start, isLast } = this.state;

  this.$element.innerHTML = /* html */ `
    ${companies
      .map(
        ({ id, company, lightLogo, darkLogo }) => /* html */ `
        <li data-company-id="${id}" data-company-name="${company}" class="cell"><img src="${
          idDarkMode ? darkLogo : lightLogo
        }"/></li>
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

GridViewer.prototype.renderSubscribeButtons = function () {
  const { companies } = this.state;

  companies.forEach(({ id }) => {
    const $listItem = this.$element.querySelector(`li[data-company-id="${id}"]`);
    const isSubscribed = isSubscribeCompany(id);

    const subscribeButton = new Button({
      $target: $listItem,
      text: "구독하기",
      icon: "plus",
      color: "white",
      classList: isSubscribed ? ["subscribe", "hide"] : ["subscribe"],
    });

    const unsubscribeButton = new Button({
      $target: $listItem,
      text: "해지하기",
      icon: "closed",
      color: "gray",
      classList: isSubscribed ? ["unsubscribe"] : ["unsubscribe", "hide"],
    });

    this.components.SubscribeButtons.push(subscribeButton);
    this.components.UnsubscribeButtons.push(unsubscribeButton);
  });
};

export default GridViewer;
