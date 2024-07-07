import "./Button.css";
import plus from "@/assets/icons/plus.svg";
import closed from "@/assets/icons/closed.svg";
import { changeFillColor } from "@/utils/svg";

function Button({ $target, position = "beforeend", icon, color, text }) {
  this.$element = document.createElement("button");
  this.$element.className = "button";
  this.$element.classList.add(color);
  if (text) this.$element.classList.add("hasText");
  $target.insertAdjacentElement(position, this.$element);

  this.render(icon, text);
}

Button.prototype.handleButtonHover = function () {
  const svgObject = this.$element.querySelector("object.buttonIcon");
  const svgDoc = svgObject.contentDocument;
  const svgElement = svgDoc.querySelector("svg");

  this.$element.addEventListener("mouseenter", () => {
    svgElement.querySelectorAll("path").forEach((el) => {
      el.style.fill = "#4b5966";
    });
  });

  this.$element.addEventListener("mouseleave", () => {
    svgElement.querySelectorAll("path").forEach((el) => {
      el.style.fill = "#879298";
    });
  });
};

Button.prototype.render = function (icon, text) {
  this.$element.innerHTML = /* html */ `
    <object class="buttonIcon" type="image/svg+xml" data="${
      icon === "plus" ? plus : closed
    }"></object>
    ${text ?? ""}
    `;

  const svgObject = this.$element.querySelector("object.buttonIcon");

  svgObject.setAttribute("width", "12px");
  svgObject.setAttribute("height", "12px");

  changeFillColor(svgObject, "gray");

  svgObject.addEventListener("load", this.handleButtonHover.bind(this));
};

export default Button;
