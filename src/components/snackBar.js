export const snackBar = (text, isList) => {
    const snackBar = document.getElementById('snackBar');
    snackBar.innerText = text;
    snackBar.className = `show`;
    if (isList) {
        setTimeout(() => {
            snackBar.classList.remove('show');
        }, 5000);
    }
    else {
        setTimeout(() => {
            snackBar.classList.remove('show');
        }, 1000);
    }
}