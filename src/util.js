export function updateDOMstyle(DOM, style) {
  Object.keys(style).forEach((key) => {
    DOM.style[key] = style[key];
  });
}