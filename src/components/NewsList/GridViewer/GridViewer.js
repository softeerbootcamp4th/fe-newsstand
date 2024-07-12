import { getAllCompany } from "@/apis/news";
import "./GridViewer.css";
import leftButton from "@/assets/icons/leftButton.png";
import rightButton from "@/assets/icons/rightButton.png";
import { COMPANIES_PER_PAGE } from "@/data/constants";
import Button from "@/components/common/Button/Button";
import {
  addCompany,
  getSubscribedCompanies,
  isSubscribeCompany,
  removeCompany,
} from "@/data/storageHandler";
import SnackBar from "@/components/common/SnackBar/SnackBar";
import UnsubscribeAlert from "@/components/UnsubscribeAlert/UnsubscribeAlert";

function GridViewer({ $target, position = "beforeend", changeTab, filter }) {
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

  this.components = {
    SubscribeButtons: [],
    UnsubscribeButtons: [],
    SnackBar: new SnackBar({
      $target: this.$element,
      text: "내가 구독한 언론사에 추가되었습니다.",
    }),

    UnsubscribeAlert: new UnsubscribeAlert({
      $target: this.$element,
      company: "",
      onConfirm: () => {},
    }),
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
  const $button = event.target.closest("button");

  if ($button) {
    const { classList } = $button;

    if (classList.contains("newsButton")) {
      this.handleMovePageButtonClick($button);

      return;
    }

    if (classList.contains("subscribe") || classList.contains("unsubscribe")) {
      this.handleCompanyButtonClick($button);

      return;
    }
  }
};

GridViewer.prototype.handleMovePageButtonClick = function ($button) {
  const { id } = $button;

  if (id === "nextButton") {
    this.nextPage();

    return;
  }

  if (id === "prevButton") {
    this.prevPage();

    return;
  }
};

GridViewer.prototype.handleCompanyButtonClick = function ($button) {
  const { classList } = $button;
  const {
    dataset: { companyId },
  } = $button.closest("li");

  if (classList.contains("subscribe")) {
    const company = this.state.companies.find(
      (company) => Number(company.id) === Number(companyId)
    );

    if (!company) return;

    this.subscribeCompany({ ...company });

    return;
  }

  if (classList.contains("unsubscribe")) {
    this.unsubscribeCompany({ id: companyId });

    return;
  }
};

GridViewer.prototype.nextPage = function () {
  this.load(this.state.start + COMPANIES_PER_PAGE);
};

GridViewer.prototype.prevPage = function () {
  this.load(this.state.start - COMPANIES_PER_PAGE);
};

GridViewer.prototype.load = async function (start) {
  if (this.props.filter === "company") {
    const subscribedCompanies = getSubscribedCompanies().slice(start, start + 24);
    const isLast = subscribedCompanies.length < start + 24;

    this.setState({ companies: subscribedCompanies, start, isLast });
    this.renderSubscribeButtons();

    return;
  }

  const companies = await getAllCompany(start);
  const nextPage = await getAllCompany(start + COMPANIES_PER_PAGE);

  const isLast = nextPage.length < 1;

  this.setState({ companies, start, isLast });
  this.renderSubscribeButtons();
};

GridViewer.prototype.subscribeCompany = function ({ id, company, lightLogo, darkLogo }) {
  this.showUnsubscribeButton(id);

  addCompany({ id, company, lightLogo, darkLogo });

  this.components.SnackBar.show();
};

GridViewer.prototype.unsubscribeCompany = function ({ id }) {
  removeCompany({ id });

  if (this.props.filter === "company") {
    this.removeCell(id);

    return;
  }

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

GridViewer.prototype.removeCell = function (companyId) {
  const $listItem = this.$element.querySelector(`li[data-company-id="${companyId}"]`);

  $listItem.remove();
};

GridViewer.prototype.render = function () {
  const idDarkMode = document.body.classList.contains("dark");
  const { companies, start, isLast } = this.state;

  this.$element.innerHTML = /* html */ `
    ${companies
      .map(
        ({ id, lightLogo, darkLogo }) => /* html */ `
        <li data-company-id="${id}" class="cell"><img src="${
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
