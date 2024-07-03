export function changeFillColor($target, color) {
  $target.addEventListener("load", function () {
    const svgDoc = svgObject.contentDocument;
    const svgElement = svgDoc.querySelector("svg");
    svgElement.querySelectorAll("*").forEach((el) => {
      el.setAttribute("fill", color);
    });
  });
}
