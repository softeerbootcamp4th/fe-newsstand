import "./AutoRollingNews.css";

function AutoRollingNews({ $target, position = "beforeend" }) {
  this.$element = document.createElement("div");
  this.$element.className = "viewer";
  $target.insertAdjacentElement(position, this.$element);

  this.render = () => {
    this.$element.innerHTML = /* html */ `
      <section class="LatestNews">
        <p class="company">연합뉴스</p>
        <p class="newsTitle">[1보] 김기현·안철수·천하람·황교안, 與전대 본경선 진출</p>
      </section>
      <section class="LatestNews">
        <p class="company">연합뉴스</p>
        <p class="newsTitle">[속보] 與최고위원 본경선, 김병민·김용태·김재원·민영삼</p>
      </section>`;
  };

  this.render();
}

export default AutoRollingNews;
