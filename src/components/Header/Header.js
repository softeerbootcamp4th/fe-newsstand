import "./Header.css";
import { formatDate } from "@/utils/date";

function Header({ $target, position = "afterbegin" }) {
  this.$element = document.createElement("header");
  this.$element.className = "header";
  $target.insertAdjacentElement(position, this.$element);

  this.render();
  this.$element.addEventListener("click", this.handleLogoClick);
}

Header.prototype.handleLogoClick = function (event) {
  if (event.target.parentElement.id === "logo") {
    window.location.reload();
  }
};

Header.prototype.render = function () {
  this.$element.innerHTML = /* html */ `
    <section id="logo" class="logo">
      <img src="/logo.svg" />
      <h2>뉴스 스탠드</h2>
    </section>
    
    <section>
      <p class="date">${formatDate(new Date())}</p>
    </section>
  `;
};

export default Header;
