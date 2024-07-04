export const pressInfoButton = (text) => {
    const iconId = text ? 'plus' : 'closed'
    return `
        <button class="pressInfoButton">
            <img src='../../images/${iconId}.svg' alt='${iconId} icon'/>
            ${text && `<span>${text}</span>`}
        </button>
    `;
};