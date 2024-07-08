export const ChipButton = (props) => {
    let element = document.createElement('div');
    element.className = 'chip-button-container';

    function render() {
        const html = `
            <div class="chip-button">
                <img class="chip-button-icon" src=${props.icon} alt="icon"></img>
                <span>${props.title}</span>
            </div>
        `;
        element.innerHTML = html;
    }

    function updateProps(newProps) {
        props = newProps;
        render();
    }

    render();

    return {
        element,
        updateProps
    };
};

export default ChipButton;
