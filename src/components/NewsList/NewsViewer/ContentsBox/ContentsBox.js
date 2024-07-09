import "./ContentsBox.css";
import Button from "@/components/common/Button/Button";
import SnackBar from "@/components/common/SnackBar/SnackBar";
import UnsubscribeAlert from "@/components/UnsubscribeAlert/UnsubscribeAlert";
import { isSubscribeCompany, subscribeCompany } from "@/data/storageHandler";

function ContentsBox({ $target, position = "beforeend", news, onSubscribeCompany }) {
  this.$element = document.createElement("div");
  this.$element.className = "contentsBox";
  $target.insertAdjacentElement(position, this.$element);

  this.props = {
    news,
    onSubscribeCompany,
  };

  this.render();

  this.components = {
    SubscribeButton: new Button({
      $target: this.$element.querySelector(".companyInfo"),
      text: "구독하기",
      color: "gray",
      icon: "plus",
      onClick: this.handleSubscribe.bind(this),
    }),

    UnsubscribeButton: new Button({
      $target: this.$element.querySelector(".companyInfo"),
      color: "white",
      icon: "closed",
      onClick: this.showUnsubscribeAlert.bind(this),
    }),

    SnackBar: new SnackBar({
      $target: this.$element,
      text: "내가 구독한 언론사에 추가되었습니다.",
    }),

    UnsubscribeAlert: new UnsubscribeAlert({
      $target: this.$element,
      company: news.company,
      onConfirm: this.handleUnsubscribe.bind(this),
    }),
  };

  this.renderSubscribeButton();
}

ContentsBox.prototype.handleSubscribe = function () {
  subscribeCompany(this.props.news.company);

  this.components.SnackBar.show();
  this.showUnsubscribeButton();
};

ContentsBox.prototype.handleUnsubscribe = function () {
  this.props.onSubscribeCompany(this.props.news.company);

  this.components.UnsubscribeAlert.show();
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
  this.components.UnsubscribeAlert.show();
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
};

ContentsBox.prototype.renderSubscribeButton = function () {
  if (isSubscribeCompany(this.props.news.company)) {
    this.showUnsubscribeButton();

    return;
  }

  this.showSubscribeButton();
};

export default ContentsBox;
