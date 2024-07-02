export const createTypographysWithClasse = () => {
    var classNames = [
        "display-bold24", 
        "display-bold16",
        "display-bold14", 
        "display-bold12",
        "display-medium16",
        "display-medium14",
        "display-medium12",
        "selected-bold16",
        "selected-bold14",
        "available-medium16",
        "available-medium14",
        "available-medium12",
        "hover-medium16",
        "hover-medium14"
    ];

    classNames.forEach(function(className) {
        var divElement = document.createElement("div");
        divElement.style.marginBottom = "10px";

        var labelElement = document.createElement("label");
        labelElement.textContent = className;
        labelElement.style.marginRight = "10px";

        var pElement = document.createElement("span");
        pElement.textContent = "이슈트래커";
        pElement.classList.add(className);

        divElement.appendChild(labelElement);
        divElement.appendChild(pElement);

        document.body.appendChild(divElement);
    });
}
createTypographysWithClasse();