import "./Button.css";
import plus from "@/assets/icons/plus.svg";
import closed from "@/assets/icons/closed.svg";
import { changeFillColor } from "@/utils/svg";

function Button({ $target, position = "beforeend", icon, color, text }) {
  this.$element = document.createElement("button");
  this.$element.className = "button";
  this.$element.classList.add(color);
  $target.insertAdjacentElement(position, this.$element);

  function handleButtonHover() {
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
  }

  this.render = () => {
    this.$element.innerHTML = /* html */ `
    <object id="svgObject" class="buttonIcon" type="image/svg+xml" data="${
      icon === "plus" ? plus : closed
    }"></object>
    ${text ?? ""}`;

    const svgObject = this.$element.querySelector("#svgObject");
    svgObject.setAttribute("width", "12px");
    svgObject.setAttribute("height", "12px");

    changeFillColor(svgObject, "gray");

    svgObject.addEventListener("load", handleButtonHover.bind(this));
  };

  this.render();
}

export default Button;
