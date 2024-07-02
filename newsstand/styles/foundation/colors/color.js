export const createColorWithClass = () => {
    var tokenName = [
        [
            "grayscale-white-alt",
            "graysclae-white",
            "grayscale50",
            "grayscale100",
            "grayscale200",
            "grayscale300",
            "grayscale400",
            "grayscale500",
            "grayscaleBlack",
            "blue100",
            "blue500"
        ],
        [
            "text-strong",
            "text-bold",
            "text-default",
            "text-weak",
            "text-white-default",
            "text-white-weak",
            "text-point",
            "surface-default",
            "surface-alt",
            "surface-brand-default",
            "surface-brand-alt",
            "border-bold",
            "border-default"
        ]
    ];

    const getCSSVariableValue = (variable) => {
        return getComputedStyle(document.documentElement).getPropertyValue(variable).trim();
    };

    const container = document.getElementById('color-tokens');

    const createColorItems = (colors, title) => {
        const titleElement = document.createElement('div');
        titleElement.classList.add('display-bold24');
        titleElement.style.paddingTop = "20px"
        titleElement.style.paddingBottom = '20px'
        titleElement.textContent = title;
        container.appendChild(titleElement);

        colors.forEach(color => {
            const colorItem = document.createElement('div');
            colorItem.classList.add('color-item');

            const colorBox = document.createElement('div');
            colorBox.classList.add('color-box');
            colorBox.style.backgroundColor = getCSSVariableValue(`--color-${color}`);

            const label = document.createElement('span');
            label.classList.add('display-medium14')
            label.textContent = color;

            colorItem.appendChild(colorBox);
            colorItem.appendChild(label);
            container.appendChild(colorItem);
        });
    };

    createColorItems(tokenName[0], "Default Color");
    createColorItems(tokenName[1], "Light Mode");
}

createColorWithClass();