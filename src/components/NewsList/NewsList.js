import "./NewsList.css";
import EmptyNewsViewer from "@/components/NewsList/EmptyNewsViewer/EmptyNewsViewer";
import NewsViewer from "@/components/NewsList/NewsViewer/NewsViewer";
import { getSubscribedCompanies } from "@/data/storageHandler";

function NewsList({ $target, position = "beforeend" }) {
  this.$element = document.createElement("div");
  this.$element.className = "newsList";
  $target.insertAdjacentElement(position, this.$element);

  this.state = {
    filterIndex: 0,
  };

  this.render(this.state.filterIndex);
  this.$element.addEventListener("click", this.handleClick.bind(this));
}

NewsList.prototype.setState = function (filterIndex) {
  this.state = { filterIndex };

  this.render();
};

NewsList.prototype.changeTab = function (filterIndex, tabIndex) {
  this.state = { filterIndex };

  this.render(tabIndex);
};

NewsList.prototype.handleClick = function (event) {
  const listItem = event.target.closest("li.filterTab");

  if (listItem) {
    const filterIndex = Number(listItem.dataset.tabNumber);

    this.setState(filterIndex);
  }
};

NewsList.prototype.render = function (tabIndex) {
  this.$element.innerHTML = /* html */ `
    <ul class="newsFilter">
      ${["전체 언론사", "내가 구독한 언론사"]
        .map(
          (value, idx) => /* html */ `
          <li data-tab-number="${idx}" class="filterTab${
            idx === this.state.filterIndex ? " selected" : ""
          }">${value}</li>
        `
        )
        .join("")}
    </ul>
  `;

  const filter = this.state.filterIndex === 0 ? "category" : "company";

  if (this.state.filterIndex === 1 && getSubscribedCompanies().length < 1) {
    new EmptyNewsViewer({ $target: this.$element });

    return;
  }

  new NewsViewer({
    $target: this.$element,
    filter: filter,
    changeTab: this.changeTab.bind(this),
    initialTab: tabIndex,
  });
};

export default NewsList;
