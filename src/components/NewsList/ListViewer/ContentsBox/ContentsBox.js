import "./ContentsBox.css";
import Button from "@/components/common/Button/Button";
import SnackBar from "@/components/common/SnackBar/SnackBar";
import UnsubscribeAlert from "@/components/UnsubscribeAlert/UnsubscribeAlert";
import { isSubscribeCompany } from "@/data/storageHandler";

function ContentsBox({
  $target,
  position = "beforeend",
  news,
  onUnsubscribeCompany,
  onSubscribeCompany,
}) {
  this.$element = document.createElement("div");
  this.$element.className = "contentsBox";
  $target.insertAdjacentElement(position, this.$element);

  this.props = {
    news,
    onUnsubscribeCompany,
    onSubscribeCompany,
  };

  this.render();

  this.components = {
    SubscribeButton: new Button({
      $target: this.$element.querySelector(".companyInfo"),
      text: "구독하기",
      color: "gray",
      icon: "plus",
      onClick: this.handleSubscribeButtonClick.bind(this),
    }),

    UnsubscribeButton: new Button({
      $target: this.$element.querySelector(".companyInfo"),
      color: "white",
      icon: "closed",
      onClick: this.showUnsubscribeAlert.bind(this),
    }),

    SnackBar: new SnackBar({
      $target: this.$element,
    }),

    UnsubscribeAlert: new UnsubscribeAlert({
      $target: this.$element,
      onConfirm: this.handleUnsubscribe.bind(this),
    }),
  };

  this.renderSubscribeButton();
}

ContentsBox.prototype.handleSubscribeButtonClick = function () {
  const { id, company, lightLogo, darkLogo } = this.props.news;

  this.props.onSubscribeCompany({ id, company, lightLogo, darkLogo });

  this.components.SnackBar.show({ text: "내가 구독한 언론사에 추가되었습니다." });
  this.showUnsubscribeButton();
};

ContentsBox.prototype.handleUnsubscribe = function () {
  const { id, company } = this.props.news;

  this.props.onUnsubscribeCompany({ id, company });

  this.components.UnsubscribeAlert.show(company);
  this.showSubscribeButton();
};

ContentsBox.prototype.showSubscribeButton = function () {
  this.components.UnsubscribeButton.$element.classList.add("hide");
  this.components.SubscribeButton.$element.classList.remove("hide");
};

ContentsBox.prototype.showUnsubscribeButton = function () {
  this.components.SubscribeButton.$element.classList.add("hide");
  this.components.UnsubscribeButton.$element.classList.remove("hide");
};

ContentsBox.prototype.showUnsubscribeAlert = function () {
  this.components.UnsubscribeAlert.show(this.props.news.company);
};

ContentsBox.prototype.formatDate = function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${year}. ${month}. ${day}. ${hours}:${minutes}`;
};

ContentsBox.prototype.render = function () {
  const { news } = this.props;

  this.$element.innerHTML = /* html */ `
    <section class="companyInfo">
      <img src="${document.body.classList.contains("dark") ? news.darkLogo : news.lightLogo}"/>
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
};

ContentsBox.prototype.renderSubscribeButton = function () {
  if (isSubscribeCompany(this.props.news.id)) {
    this.showUnsubscribeButton();

    return;
  }

  this.showSubscribeButton();
};

export default ContentsBox;
