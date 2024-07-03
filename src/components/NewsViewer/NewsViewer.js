import "./NewsViewer.css";
import Button from "@/components/common/Button/Button";
import articles from "@/mocks/data/articles.json";

function NewsViewer({ $target, position = "beforeend" }) {
  this.$element = document.createElement("div");
  this.$element.className = "newsViewer";
  $target.insertAdjacentElement(position, this.$element);

  function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${year}. ${month}. ${day}. ${hours}:${minutes}`;
  }

  this.render = () => {
    this.$element.innerHTML = /* html */ `
          <section class="companyInfo">
            <img src="${articles[0].companyLogo}"/>
            <p>${formatDate(new Date())} 편집</p>
          </section>

          <section class="articleInfo">
            <div class="mainNews">
              <img src="${articles[0].imgUrl}"/>
              <p>${articles[0].title}</p>
            </div>

            <div class="subNews">
              <ul>
                ${articles[0].headlines.map((str) => `<li>${str}</li>`).join("\n")}
                <p>${articles[0].company} 언론사에서 직접 편집한 뉴스입니다.</p>
              </ul>
            </div>
          </section>
      `;

    new Button({
      $target: this.$element.querySelector(".companyInfo"),
      text: "구독하기",
      color: "gray",
      icon: "plus",
    });
  };

  this.render();
}

export default NewsViewer;
