export function changeFillColor($object, color) {
  $object.addEventListener("load", () => {
    const svgElement = $object.contentDocument.querySelector("svg");

    svgElement.querySelectorAll("*").forEach((el) => {
      el.setAttribute("fill", color);
    });
  });
}
