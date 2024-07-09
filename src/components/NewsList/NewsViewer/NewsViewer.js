import "./NewsViewer.css";
import leftButton from "@/assets/icons/leftButton.png";
import rightButton from "@/assets/icons/rightButton.png";
import chevronRight from "@/assets/icons/chevronRight.svg";
import ContentsBox from "./ContentsBox/ContentsBox";
import { CATEGORIES } from "@/mocks/news";
import { getSubscribedCompanies, unSubscribeCompany } from "@/data/storageHandler";
import { getNews } from "../../../apis/news";

function NewsViewer({ $target, position = "beforeend", filter = "category", changeFilter }) {
  this.$element = document.createElement("article");
  this.$element.className = "newsViewer";
  $target.insertAdjacentElement(position, this.$element);

  this.props = {
    filter,
    changeFilter,
  };

  this.state = {
    page: 0,
    tab: 0,
    news: [],
    tabs: [],
  };

  this.timer = null;

  this.render();

  this.loadNews(this.state.tab, this.state.page);

  this.$element.addEventListener("click", this.handleClick.bind(this));
}

NewsViewer.prototype.setState = function ({ page, tab, news, tabs }) {
  this.state = {
    page: page ?? this.state.page,
    tab: tab ?? this.state.tab,
    news: news ?? this.state.news,
    tabs: tabs ?? this.state.tabs,
  };

  this.render();
};

NewsViewer.prototype.loadNews = async function (tab, page) {
  if (this.props.filter === "category") {
    const news = await getNews({ category: tab });

    this.setState({ tab, page, news, tabs: CATEGORIES });
  }

  if (this.props.filter === "company") {
    const companies = getSubscribedCompanies();
    const news = await getNews({ company: companies[tab] });

    this.setState({ tab, page, news, tabs: companies });
  }

  this.initializeProgress();
};

NewsViewer.prototype.handleClick = function (event) {
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

  const listItem = event.target.closest("li.tab");

  if (listItem) {
    const tab = Number(listItem.dataset.tabNumber);

    this.handleTabClick(tab);
  }
};

NewsViewer.prototype.handleTabClick = function (tab) {
  this.loadNews(tab, 0);
};

NewsViewer.prototype.initializeProgress = function () {
  if (this.timer) clearInterval(this.timer);

  this.timer = setInterval(this.progressInterval.bind(this), 1000);
};

NewsViewer.prototype.progressInterval = function () {
  const $progress = this.$element.querySelector(
    `.tab[data-tab-number="${this.state.tab}"] .progress`
  );

  if ($progress.value === 100) {
    $progress.classList.remove("progressTransition");
    $progress.value = 0;

    this.nextPage();

    $progress.classList.add("progressTransition");
  }

  $progress.value += 5;
};

NewsViewer.prototype.nextPage = function () {
  const nextPage = this.state.page + 1;

  if (nextPage >= this.state.news.length) {
    this.nextTab();

    return;
  }

  this.loadNews(this.state.tab, nextPage);
};

NewsViewer.prototype.prevPage = function () {
  const prevPage = this.state.page - 1;

  if (prevPage < 0) {
    this.prevTab();

    return;
  }

  this.loadNews(this.state.tab, prevPage);
};

NewsViewer.prototype.nextTab = function () {
  const nextTab = this.state.tab + 1;

  if (nextTab >= this.state.tabs.length) {
    this.loadNews(0, 0);

    return;
  }

  this.loadNews(nextTab, 0);
};

NewsViewer.prototype.prevTab = function () {
  const prevTab = this.state.tab - 1;

  if (prevTab < 0) {
    this.loadNews(0, 0);

    return;
  }

  this.loadNews(prevTab, this.state.news.length - 1);
};

NewsViewer.prototype.handleUnsubscribeCompany = function (company) {
  unSubscribeCompany(company);

  if (this.props.filter === "company") {
    if (getSubscribedCompanies().length < 1) {
      this.props.changeFilter(0);

      return;
    }

    this.loadNews(0, 0);
  }
};

NewsViewer.prototype.MoveToSelectedTab = function () {
  const selectedTab = this.$element.querySelector(".tab.selected");

  if (selectedTab) {
    selectedTab.scrollIntoView({ behavior: "instant", inline: "center" });
  }
};

NewsViewer.prototype.formatDate = function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${year}. ${month}. ${day}. ${hours}:${minutes}`;
};

NewsViewer.prototype.render = function () {
  const { news, tabs, tab, page } = this.state;

  this.$element.innerHTML = /* html */ `
    <ul class="tabs">
      ${tabs
        .map(
          (name, idx) => /* html */ `
          <li data-tab-number="${idx}" class="tab${tab === idx ? " selected" : ""}">
            <p class="tabInfo">
              <span>${name}</span>
              ${
                this.props.filter === "category"
                  ? /* html */ `
                  <span class="pageInfo">${page + 1}
                    <span class="maxPage"> / ${news.length}</span>
                  </span>`
                  : /* html */ `
                  <object class="pageInfo" type="image/svg+xml" data="${chevronRight}"></object>
                  `
              }
            </p>
            <progress class="progress progressTransition" value="0" min="0" max="100"></progress>
          </li>
        `
        )
        .join("")}
    </ul>

    <button id="prevButton" class="newsButton prev${
      tab === 0 && page === 0 ? " hide" : ""
    }"><img src="${leftButton}"/></button>
    <button id="nextButton" class="newsButton next"><img src="${rightButton}"/></button>
  `;

  this.MoveToSelectedTab();

  if (news.length > 0) {
    new ContentsBox({
      $target: this.$element.querySelector(".tabs"),
      position: "afterend",
      news: news[page],
      onSubscribeCompany: this.handleUnsubscribeCompany.bind(this),
    });
  }
};

export default NewsViewer;
