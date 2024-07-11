import { getSVGTemplate } from "@/components/common/SVG/SVG";
import "./ThemeToggleButton.css";

function ThemeToggleButton({ $target, position = "beforeend", onChangeTheme }) {
  this.$element = document.createElement("button");
  this.$element.className = "toggleButton";
  $target.insertAdjacentElement(position, this.$element);

  this.props = {
    onChangeTheme,
  };

  this.render();
  this.$element.addEventListener("click", this.changeTheme.bind(this));
}

ThemeToggleButton.prototype.changeTheme = function () {
  document.body.classList.toggle("dark");

  this.render();
  this.props.onChangeTheme();
};

ThemeToggleButton.prototype.render = function () {
  const isDarkMode = document.body.classList.contains("dark");

  this.$element.innerHTML = /* html */ `
    ${getSVGTemplate({ iconId: isDarkMode ? "light-mode" : "dark-mode" })}
  `;
};

export default ThemeToggleButton;
