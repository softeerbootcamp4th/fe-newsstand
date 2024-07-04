import "./AutoRollingNews.css";

function AutoRollingNews({ $target, position = "beforeend", news }) {
  this.$element = document.createElement("div");
  this.$element.className = "viewer";
  $target.insertAdjacentElement(position, this.$element);

  function getNewsTitleTemplate(str, idx) {
    const classList = ["newsTitle", "ellipsis"];

    if (idx === 0) classList.push("current");
    else if (idx === 1) classList.push("next");
    else if (idx === 2) classList.push("prev");

    return `<li class="${classList.join(" ")}"><a>${str}</a></li>`;
  }

  function initializeBanner($banner) {
    let interval = window.setInterval(() => {
      rollingBanner($banner);
    }, 5000);

    $banner.addEventListener("mouseenter", () => {
      window.clearInterval(interval);
    });

    $banner.addEventListener("mouseleave", () => {
      interval = window.setInterval(() => {
        rollingBanner($banner);
      }, 5000);
    });
  }

  function rollingBanner($banner) {
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
  }

  this.render = () => {
    this.$element.innerHTML = /* html */ `
      <section class="breakingNews">
        <p class="company">연합뉴스</p>
        <div id="leftBanner" class="banner">
          <ul>
            ${news
              .slice(0, Math.floor(news.length / 2))
              .map(getNewsTitleTemplate)
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
              .map(getNewsTitleTemplate)
              .join("\n")}
          </ul>
        </div>
      </section>`;
  };

  this.render();

  const $leftBanner = this.$element.querySelector("#leftBanner");
  const $rightBanner = this.$element.querySelector("#rightBanner");

  initializeBanner($leftBanner);

  setTimeout(() => {
    initializeBanner($rightBanner);
  }, 1000);
}

export default AutoRollingNews;
