export const PressInfoContainer = (props) => {
    let element = document.createElement('div');
    element.className = 'press-info-container';

    function render() {
        const html = `
            <img src="${props.imageSrc}" />
            <span class="press-info-edit-date">${props.editTime}</span>
            <button>구독하기</button>
        `;
        
        element.innerHTML = html;
    }

    render();

    return {
        element
    };
}

export default PressInfoContainer;
