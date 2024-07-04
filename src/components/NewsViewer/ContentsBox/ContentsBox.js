import "./ContentsBox.css";
import Button from "@/components/common/Button/Button";

function ContentsBox({ $target, position = "beforeend", news }) {
  this.$element = document.createElement("div");
  this.$element.className = "contentsBox";
  $target.insertAdjacentElement(position, this.$element);

  this.render(news);
}

ContentsBox.prototype.formatDate = function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${year}. ${month}. ${day}. ${hours}:${minutes}`;
};

ContentsBox.prototype.render = function (news) {
  this.$element.innerHTML = /* html */ `
    <section class="companyInfo">
      <img src="${news.companyLogo}"/>
      <p>${this.formatDate(new Date())} 편집</p>
    </section>

    <section class="articleInfo">
      <div class="mainNews">
        <div>
          <img src="${news.thumbnail}"/>
        </div>
        <p>${news.title}</p>
      </div>

      <div class="subNews">
        <ul>
          ${news.headlines.map((str) => `<li class="ellipsis"><a>${str}</a></li>`).join("")}
          <p>${news.company} 언론사에서 직접 편집한 뉴스입니다.</p>
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

export default ContentsBox;
