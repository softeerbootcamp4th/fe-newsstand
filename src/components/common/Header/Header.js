import "./Header.css";
import { formatDate } from "@/utils/date";

function Header({ $target }) {
  this.$element = document.createElement("header");
  this.$element.className = "header";
  $target.appendChild(this.$element);

  function handleLogoClick(event) {
    if (event.target.parentElement.id === "logo") {
      window.location.reload();
    }
  }

  this.$element.addEventListener("click", handleLogoClick);

  this.render = () => {
    this.$element.innerHTML = /* html */ `
      <section id="logo" class="logo">
        <img src="/logo.svg" />
        <h2>뉴스 스탠드</h2>
      </section>
      <section>
      <p class="date">${formatDate(new Date())}</p>
      </section>`;
  };

  this.render();
}

export default Header;
