import "./NewsList.css";
import EmptyNewsViewer from "@/components/NewsList/EmptyNewsViewer/EmptyNewsViewer";
import NewsViewer from "@/components/NewsList/NewsViewer/NewsViewer";

import { getSubscribedCompanies } from "@/data/storageHandler";

function NewsList({ $target, position = "beforeend" }) {
  this.$element = document.createElement("div");
  this.$element.className = "newsList";
  $target.insertAdjacentElement(position, this.$element);

  this.state = {
    tabIndex: 0,
  };

  this.render();

  this.$element.addEventListener("click", this.handleClick.bind(this));
}

NewsList.prototype.setState = function (tabIndex) {
  this.state = { tabIndex };

  this.render();
};

NewsList.prototype.handleClick = function (event) {
  const listItem = event.target.closest("li.filterTab");

  if (listItem) {
    const tab = Number(listItem.dataset.tabNumber);

    this.setState(tab);
  }
};

NewsList.prototype.render = function () {
  this.$element.innerHTML = /* html */ `
    <ul class="newsFilter">
      ${["전체 언론사", "내가 구독한 언론사"]
        .map(
          (value, idx) => /* html */ `
          <li data-tab-number="${idx}" class="filterTab${
            idx === this.state.tabIndex ? " selected" : ""
          }">${value}</li>
        `
        )
        .join("")}
    </ul>
  `;

  const filter = this.state.tabIndex === 0 ? "category" : "company";

  if (this.state.tabIndex === 1 && getSubscribedCompanies().length < 1) {
    new EmptyNewsViewer({ $target: this.$element });

    return;
  }

  new NewsViewer({
    $target: this.$element,
    filter: filter,
    changeFilter: this.setState.bind(this),
  });
};

export default NewsList;
