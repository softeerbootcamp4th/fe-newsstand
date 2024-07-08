import "./EmptyNewsViewer.css";

function EmptyNewsViewer({ $target, position = "beforeend" }) {
  this.$element = document.createElement("article");
  this.$element.className = "newsViewer";
  $target.insertAdjacentElement(position, this.$element);

  this.render();
}

EmptyNewsViewer.prototype.render = function () {
  this.$element.innerHTML = /* html */ `
    <div class="emptyView">
      <p class="bold">구독한 언론사가 없습니다.</p>
      <p>언론사 구독 설정에서 관심 있는 언론사를 구독하시면\n언론사가 직접 편집한 뉴스들을 네이버 홈에서 바로 보실 수 있습니다.</p>
    </div>
  `;
};

export default EmptyNewsViewer;
