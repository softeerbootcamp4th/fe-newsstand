import "./SVG.css";

export const getSVGTemplate = ({ className = "", iconId }) => /* html */ `
  <svg class="${className}">
    <use xlink:href=src/assets/icons/sprite.svg#${iconId}></use>
  </svg>
  `;
