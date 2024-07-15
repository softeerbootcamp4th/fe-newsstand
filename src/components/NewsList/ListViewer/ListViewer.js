import "./ListViewer.css";
import leftButton from "@/assets/icons/leftButton.png";
import rightButton from "@/assets/icons/rightButton.png";
import ContentsBox from "@/components/NewsList/ListViewer/ContentsBox/ContentsBox";
import { addCompany, getSubscribedCompanies, removeCompany } from "@/data/storageHandler";
import { CATEGORIES } from "@/data/constants";
import { getNews } from "@/apis/news";
import { getSVGTemplate } from "@/components/common/SVG/SVG";
import { shuffleArray } from "@/utils/array";

function ListViewer({
  $target,
  position = "beforeend",
  filter = "category",
  changeTab,
  initialTab = 0,
}) {
  this.$element = document.createElement("article");
  this.$element.className = "listViewer";
  $target.insertAdjacentElement(position, this.$element);

  this.props = {
    filter,
    changeTab,
  };

  this.state = {
    page: 0,
    tab: initialTab,
    news: [],
    tabs: [],
  };

  this.timer = null;

  this.render();

  this.loadNews(this.state.tab, this.state.page);

  this.$element.addEventListener("click", this.handleClick.bind(this));
}

ListViewer.prototype.setState = function ({ page, tab, news, tabs }) {
  this.state = {
    page: page ?? this.state.page,
    tab: tab ?? this.state.tab,
    news: news ?? this.state.news,
    tabs: tabs ?? this.state.tabs,
  };

  this.render();
};

ListViewer.prototype.loadNews = async function (tab, page) {
  if (this.props.filter === "category") {
    const news = await getNews({ category: tab });

    // const shuffledNews = shuffleArray(news);
    const shuffledNews = news;

    this.setState({ tab, page, news: shuffledNews, tabs: CATEGORIES });
  }

  if (this.props.filter === "company") {
    const companies = getSubscribedCompanies();
    const tabs = companies.map(({ company }) => company);
    const news = await getNews({ companyId: companies[tab].id });

    this.setState({ tab, page, news, tabs });
  }

  this.initializeProgress();
};

ListViewer.prototype.handleClick = function (event) {
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

ListViewer.prototype.handleTabClick = function (tab) {
  this.loadNews(tab, 0);
};

ListViewer.prototype.initializeProgress = function () {
  if (this.state.tabs.length <= 1) return;
  if (this.timer) clearInterval(this.timer);

  this.timer = setInterval(this.progressInterval.bind(this), 1000);
};

ListViewer.prototype.progressInterval = function () {
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

ListViewer.prototype.nextPage = function () {
  const nextPage = this.state.page + 1;

  if (nextPage >= this.state.news.length) {
    this.nextTab();

    return;
  }

  this.setState({ page: nextPage });
};

ListViewer.prototype.prevPage = function () {
  const prevPage = this.state.page - 1;

  if (prevPage < 0) {
    this.prevTab();

    return;
  }

  this.setState({ page: prevPage });
};

ListViewer.prototype.nextTab = function () {
  const nextTab = this.state.tab + 1;

  if (nextTab >= this.state.tabs.length) {
    this.loadNews(0, 0);

    return;
  }

  this.loadNews(nextTab, 0);
};

ListViewer.prototype.prevTab = function () {
  const prevTab = this.state.tab - 1;

  if (prevTab < 0) {
    this.loadNews(0, 0);

    return;
  }

  this.loadNews(prevTab, this.state.news.length - 1);
};

ListViewer.prototype.unsubscribeCompany = function ({ id, company }) {
  removeCompany({ id, company });

  if (this.props.filter === "company") {
    if (getSubscribedCompanies().length < 1) {
      this.props.changeTab(0, 0);

      return;
    }

    if (this.state.tab < this.state.tabs.length - 1) {
      this.loadNews(this.state.tab, 0);

      return;
    }

    this.loadNews(this.state.tab - 1, 0);
  }
};

ListViewer.prototype.subscribeCompany = function ({ id, company, lightLogo, darkLogo }) {
  addCompany({ id, company, lightLogo, darkLogo });

  const tabLength = getSubscribedCompanies().length;

  setTimeout(() => {
    this.props.changeTab(1, tabLength - 1);
  }, 2000);
};

ListViewer.prototype.MoveToSelectedTab = function () {
  const selectedTab = this.$element.querySelector(".tab.selected");

  if (selectedTab) {
    selectedTab.scrollIntoView({ behavior: "instant", inline: "center" });
  }
};

ListViewer.prototype.formatDate = function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${year}. ${month}. ${day}. ${hours}:${minutes}`;
};

ListViewer.prototype.render = function () {
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
                    </span>
                  `
                  : getSVGTemplate({ className: "svg", iconId: "chevron-right" })
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
      onUnsubscribeCompany: this.unsubscribeCompany.bind(this),
      onSubscribeCompany: this.subscribeCompany.bind(this),
    });
  }
};

export default ListViewer;
