import "./NewsViewer.css";
import Button from "@/components/common/Button/Button";
import leftButton from "@/assets/icons/leftButton.png";
import rightButton from "@/assets/icons/rightButton.png";

function NewsViewer({ $target, position = "beforeend", news }) {
  this.$element = document.createElement("article");
  this.$element.className = "newsViewer";
  $target.insertAdjacentElement(position, this.$element);

  this.state = {
    page: 0,
  };

  this.setState = function ({ page }) {
    this.state = { page };
    this.render(news);
  };

  this.render(news);
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

  if (button && button.id === "nextButton") {
    this.handleNextClick();

    return;
  }

  if (button && button.id === "prevButton") {
    this.handlePrevClick();

    return;
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
    <ul class="categoryFilter">
      <li class="selected">
        <span>종합/경제</span>
        <span class="pageInfo">${this.state.page + 1}
          <span class="newsLength"> / ${news.length}</span>
        </span>
      </li>
      <li>방송/통신</li>
      <li>IT</li>
      <li>영자지</li>
      <li>스포츠/연예</li>
      <li>매거진/전문지</li>
      <li>지역</li>
    </ul>

    <div class="contents">
      <section class="companyInfo">
        <img src="${news[this.state.page].companyLogo}"/>
        <p>${this.formatDate(new Date())} 편집</p>
      </section>

      <section class="articleInfo">
        <div class="mainNews">
          <div>
            <img src="${news[this.state.page].imgUrl}"/>
          </div>
          <p>${news[this.state.page].title}</p>
        </div>

        <div class="subNews">
          <ul>
            ${news[this.state.page].headlines
              .map((str) => `<li class="ellipsis"><a>${str}</a></li>`)
              .join("\n")}
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
