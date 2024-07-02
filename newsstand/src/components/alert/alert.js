export const Alert = (company) => {
    const pressName = company;

    const pressNameElement = document.getElementById('pressName');
    if (pressNameElement) {
        pressNameElement.textContent = pressName;
    } else {
        console.error('Element with id "pressName" not found.');
    }

    return document.body.innerHTML;
}

export default Alert;
