import { getBreakingNews } from "../../apis/news";
import "./AutoRollingNews.css";

function AutoRollingNews({ $target, position = "beforeend" }) {
  this.$element = document.createElement("div");
  this.$element.className = "viewer";
  $target.insertAdjacentElement(position, this.$element);

  this.state = {
    news: [],
  };

  this.leftTimer = null;
  this.rightTimer = null;

  this.render();
  this.load();
}

AutoRollingNews.prototype.setState = function ({ news }) {
  this.state = { news };

  this.render();
};

AutoRollingNews.prototype.load = async function () {
  const data = await getBreakingNews();

  this.setState({ news: data });

  const $leftBanner = this.$element.querySelector("#leftBanner");
  const $rightBanner = this.$element.querySelector("#rightBanner");

  this.initializeBanner($leftBanner, this.leftTimer);

  setTimeout(() => {
    this.initializeBanner($rightBanner, this.rightTimer);
  }, 1000);
};

AutoRollingNews.prototype.getNewsTitleTemplate = function (str, idx) {
  const classList = ["newsTitle", "ellipsis"];

  if (idx === 0) classList.push("current");
  else if (idx === 1) classList.push("next");
  else if (idx === 2) classList.push("prev");

  return `<li class="${classList.join(" ")}"><a>${str}</a></li>`;
};

AutoRollingNews.prototype.rollingBanner = function ($banner) {
  $banner.querySelector(".newsTitle.prev").classList.remove("prev");

  let current = $banner.querySelector(".newsTitle.current");
  current.classList.remove("current");
  current.classList.add("prev");

  let next = $banner.querySelector(".newsTitle.next");

  if (next.nextElementSibling) {
    next.nextElementSibling.classList.add("next");
  } else {
    $banner.querySelector("ul li:first-child").classList.add("next");
  }

  next.classList.remove("next");
  next.classList.add("current");
};

AutoRollingNews.prototype.initializeBanner = function ($banner, timer) {
  timer = window.setInterval(() => {
    this.rollingBanner($banner);
  }, 5000);

  $banner.addEventListener("mouseenter", () => {
    window.clearInterval(timer);
  });

  $banner.addEventListener("mouseleave", () => {
    timer = window.setInterval(() => {
      this.rollingBanner($banner);
    }, 5000);
  });
};

AutoRollingNews.prototype.render = function () {
  const { news } = this.state;

  this.$element.innerHTML = /* html */ `
    <section class="breakingNews">
      <p class="company">연합뉴스</p>
      <div id="leftBanner" class="banner">
        <ul>
          ${news
            .slice(0, Math.floor(news.length / 2))
            .map(({ title }, idx) => this.getNewsTitleTemplate(title, idx))
            .join("\n")}
        </ul>
      </div>
    </section>
    <section class="breakingNews">
      <p class="company">연합뉴스</p>
      <div id="rightBanner" class="banner">
        <ul>
          ${news
            .slice(Math.floor(news.length / 2))
            .map(({ title }, idx) => this.getNewsTitleTemplate(title, idx))
            .join("\n")}
        </ul>
      </div>
    </section>
  `;
};

export default AutoRollingNews;
