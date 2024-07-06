import "./NewsViewer.css";
import leftButton from "@/assets/icons/leftButton.png";
import rightButton from "@/assets/icons/rightButton.png";
import { getNews } from "@/mocks/news";
import { CATEGORIES } from "@/constants/news";
import ContentsBox from "./ContentsBox/ContentsBox";

function NewsViewer({ $target, position = "beforeend" }) {
  this.$element = document.createElement("article");
  this.$element.className = "newsViewer";
  $target.insertAdjacentElement(position, this.$element);

  this.state = {
    page: 0,
    category: 0,
  };

  this.setState = function ({ page, category }) {
    this.state = {
      page: page ?? this.state.page,
      category: category ?? this.state.category,
    };
    this.render(getNews(this.state.category));
  };

  this.render(getNews(this.state.category));
  this.$element.addEventListener("click", this.handleClick.bind(this));

  this.initializeProgress();
}

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

  const listItem = event.target.closest("li.category");

  if (listItem) {
    const category = Number(listItem.dataset.categoryNumber);

    this.handleCategoryClick(category);
  }
};

NewsViewer.prototype.handleCategoryClick = function (category) {
  this.setState({ page: 0, category });
};

NewsViewer.prototype.initializeProgress = function () {
  const interval = setInterval(this.progressInterval.bind(this), 1000);
};

NewsViewer.prototype.progressInterval = function () {
  const $progress = this.$element.querySelector(
    `.category[data-category-number="${this.state.category}"] .progress`
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
  const news = getNews(this.state.category);
  const nextPage = this.state.page + 1;

  if (nextPage >= news.length) {
    this.nextCategory();

    return;
  }

  this.setState({ page: nextPage });
};

NewsViewer.prototype.prevPage = function () {
  const prevPage = this.state.page - 1;

  if (prevPage < 0) {
    this.prevCategory();

    return;
  }

  this.setState({ page: prevPage });
};

NewsViewer.prototype.nextCategory = function () {
  const nextCategory = this.state.category + 1;

  if (nextCategory >= CATEGORIES.length) {
    this.setState({ category: 0, page: 0 });

    return;
  }

  this.setState({ category: nextCategory, page: 0 });
};

NewsViewer.prototype.prevCategory = function () {
  const prevCategory = this.state.category - 1;

  if (prevCategory < 0) {
    this.setState({ category: 0, page: 0 });

    return;
  }

  const news = getNews(prevCategory);

  this.setState({ category: prevCategory, page: news.length - 1 });
};

NewsViewer.prototype.MoveToSelectedTab = function () {
  const selectedTab = this.$element.querySelector(".category.selected");

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

NewsViewer.prototype.render = function (news) {
  this.$element.innerHTML = /* html */ `
    <ul class="categoryTabs">
      ${CATEGORIES.map(
        (name, idx) => /* html */ `
          <li data-category-number="${idx}" class="category${
          this.state.category === idx ? " selected" : ""
        }">
            <p class="categoryInfo">
              <span>${name}</span>
              <span class="pageInfo">${this.state.page + 1}
                <span class="newsLength"> / ${news.length}</span>
              </span>
            </p>
            <progress class="progress progressTransition" value="0" min="0" max="100"></progress>
          </li>
        `
      ).join("")}
    </ul>

    <button id="prevButton" class="newsButton prev${
      this.state.category === 0 && this.state.page === 0 ? " hide" : ""
    }"><img src="${leftButton}"/></button>
    <button id="nextButton" class="newsButton next"><img src="${rightButton}"/></button>
  `;

  this.MoveToSelectedTab();

  new ContentsBox({
    $target: this.$element.querySelector(".categoryTabs"),
    position: "afterend",
    news: getNews(this.state.category)[this.state.page],
  });
};

export default NewsViewer;
