import "./Button.css";
import { getSVGTemplate } from "@/components/SVG/SVG";

function Button({ $target, position = "beforeend", icon, color, text, onClick }) {
  this.$element = document.createElement("button");
  this.$element.className = "button";
  this.$element.classList.add(color);
  if (text) this.$element.classList.add("hasText");
  $target.insertAdjacentElement(position, this.$element);

  this.render(icon, text);
  this.$element.addEventListener("click", onClick);
}

Button.prototype.render = function (iconId, text) {
  this.$element.innerHTML = /* html */ `
    ${getSVGTemplate({ className: "svg", iconId })}
    ${text ?? ""}
    `;
};

export default Button;
