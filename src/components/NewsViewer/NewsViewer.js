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
}

NewsViewer.prototype.handleNextClick = function () {
  this.setState({ page: this.state.page + 1 });
};

NewsViewer.prototype.handlePrevClick = function () {
  this.setState({ page: this.state.page - 1 });
};

NewsViewer.prototype.handleClick = function (event) {
  const button = event.target.closest("button");

  if (button) {
    const { id } = button;

    if (id === "nextButton") {
      this.handleNextClick();

      return;
    }

    if (id === "prevButton") {
      this.handlePrevClick();

      return;
    }
  }

  const listItem = event.target.closest("li.category");

  if (listItem) {
    const category = Number(listItem.dataset.categoryNumber);

    this.handleCategoryClick(category);
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

NewsViewer.prototype.getCategoryFilterTemplate = function (newsLength) {
  return CATEGORIES.map((name, idx) => {
    if (idx === this.state.category) {
      return /* html */ ` 
        <li data-category-number="${idx}" class="category selected">
          <span>${name}</span>
          <span class="pageInfo">${this.state.page + 1}
          <span class="newsLength"> / ${newsLength}</span>
          </span>
          <progress class="progress" value="0" min="0" max="100"></progress>
        </li>
        `;
    }

    return /* html */ `
      <li data-category-number="${idx}" class="category">
        ${name}
      </li>
    `;
  }).join("");
};

NewsViewer.prototype.handleCategoryClick = function (category) {
  this.setState({ page: 0, category });
};

NewsViewer.prototype.render = function (news) {
  this.$element.innerHTML = /* html */ `
    <ul class="categoryFilter">
      ${this.getCategoryFilterTemplate(news.length)}
    </ul>

    <button id="prevButton" class="newsButton prev${
      this.state.page === 0 ? " hide" : ""
    }"><img src="${leftButton}"/></button>
    <button id="nextButton" class="newsButton next${
      this.state.page === news.length - 1 ? " hide" : ""
    }"><img src="${rightButton}"/></button>
  `;

  new ContentsBox({
    $target: this.$element.querySelector(".categoryFilter"),
    position: "afterend",
    news: getNews(this.state.category)[this.state.page],
  });
};

export default NewsViewer;
