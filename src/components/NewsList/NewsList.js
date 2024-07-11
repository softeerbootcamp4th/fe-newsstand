import "./NewsList.css";
import EmptyListViewer from "@/components/NewsList/EmptyListViewer/EmptyListViewer";
import ListViewer from "@/components/NewsList/ListViewer/ListViewer";
import { getSubscribedCompanies } from "@/data/storageHandler";
import { getSVGTemplate } from "@/components/common/SVG/SVG";
import GridViewer from "@/components/NewsList/GridViewer/GridViewer";

function NewsList({ $target, position = "beforeend" }) {
  this.$element = document.createElement("div");
  this.$element.className = "newsList";
  $target.insertAdjacentElement(position, this.$element);

  this.state = {
    companyFilterIndex: 0,
    viewTypeFilterIndex: 0,
  };

  this.render(this.state.companyFilterIndex);
  this.$element.addEventListener("click", this.handleClick.bind(this));
}

NewsList.prototype.setState = function ({ companyFilterIndex, viewTypeFilterIndex }) {
  this.state = {
    companyFilterIndex: companyFilterIndex ?? this.state.companyFilterIndex,
    viewTypeFilterIndex: viewTypeFilterIndex ?? this.state.viewTypeFilterIndex,
  };

  this.render();
};

NewsList.prototype.changeTab = function (companyFilterIndex, tabIndex) {
  this.state.companyFilterIndex = companyFilterIndex;

  this.render(tabIndex);
};

NewsList.prototype.handleClick = function (event) {
  const $listItem = event.target.closest("li.filterTab");

  if ($listItem) {
    const $ul = $listItem.closest("ul");
    const filterIndex = Number($listItem.dataset.tabNumber);

    if ($ul.classList.contains("newsFilter")) {
      this.setState({ companyFilterIndex: filterIndex });
    }

    if ($ul.classList.contains("viewTypeFilter")) {
      this.setState({ viewTypeFilterIndex: filterIndex });
    }
  }
};

NewsList.prototype.render = function (tabIndex) {
  this.$element.innerHTML = /* html */ `
    <section class="filterSection">
      <ul class="newsFilter">
        ${["전체 언론사", "내가 구독한 언론사"]
          .map(
            (value, idx) => /* html */ `
            <li data-tab-number="${idx}" class="filterTab${
              idx === this.state.companyFilterIndex ? " selected" : ""
            }">${value}</li>
          `
          )
          .join("")}
      </ul>
      <ul class="viewTypeFilter">
          ${["list-view", "grid-view"]
            .map(
              (iconId, idx) => /* html */ `
              <li data-tab-number="${idx}" class="filterTab${
                idx === this.state.viewTypeFilterIndex ? " selected" : ""
              }">
              ${getSVGTemplate({ iconId })}</li>
            `
            )
            .join("")}
      </ul>
    </section>
  `;

  const companyFilter = this.state.companyFilterIndex === 0 ? "category" : "company";
  const viewTypeFilter = this.state.viewTypeFilterIndex === 0 ? "list" : "grid";

  if (this.state.companyFilterIndex === 1 && getSubscribedCompanies().length < 1) {
    new EmptyListViewer({ $target: this.$element });

    return;
  }

  if (viewTypeFilter === "list") {
    new ListViewer({
      $target: this.$element,
      filter: companyFilter,
      changeTab: this.changeTab.bind(this),
      initialTab: tabIndex,
    });

    return;
  }

  if (viewTypeFilter === "grid") {
    new GridViewer({ $target: this.$element });
  }
};

export default NewsList;
