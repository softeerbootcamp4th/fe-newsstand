import "./NewsViewer.css";
import Button from "@/components/common/Button/Button";
import leftButton from "@/assets/icons/leftButton.png";
import rightButton from "@/assets/icons/rightButton.png";
import { getNews } from "../../mocks/news";
import { CATEGORIES } from "../../constants/news";

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

    <div class="contents">
      <section class="companyInfo">
        <img src="${news[this.state.page].companyLogo}"/>
        <p>${this.formatDate(new Date())} 편집</p>
      </section>

      <section class="articleInfo">
        <div class="mainNews">
          <div>
            <img src="${news[this.state.page].thumbnail}"/>
          </div>
          <p>${news[this.state.page].title}</p>
        </div>

        <div class="subNews">
          <ul>
            ${news[this.state.page].headlines
              .map((str) => `<li class="ellipsis"><a>${str}</a></li>`)
              .join("")}
            <p>${news[this.state.page].company} 언론사에서 직접 편집한 뉴스입니다.</p>
          </ul>
        </div>
      </section>

      <button id="prevButton" class="newsButton prev${
        this.state.page === 0 ? " hide" : ""
      }"><img src="${leftButton}"/></button>
      <button id="nextButton" class="newsButton next${
        this.state.page === news.length - 1 ? " hide" : ""
      }"><img src="${rightButton}"/></button>
    </div>
  `;

  new Button({
    $target: this.$element.querySelector(".companyInfo"),
    text: "구독하기",
    color: "gray",
    icon: "plus",
  });
};

export default NewsViewer;
