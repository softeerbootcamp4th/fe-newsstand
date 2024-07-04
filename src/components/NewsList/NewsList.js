import NewsViewer from "@/components/NewsViewer/NewsViewer";
import "./NewsList.css";

function NewsList({ $target, position = "beforeend" }) {
  this.$element = document.createElement("div");
  this.$element.className = "newsList";
  $target.insertAdjacentElement(position, this.$element);

  this.render();
}

NewsList.prototype.render = function () {
  this.$element.innerHTML = /* html */ `
    <ul class="newsFilter">
      <li class="selected" >전체 언론사</li>
      <li>내가 구독한 언론사</li>
    </ul>
  `;

  new NewsViewer({
    $target: this.$element,
  });
};

export default NewsList;
