export const snackBar = (text) => {
    const snackBar = document.getElementById('snackBar');
    snackBar.innerText = text;
    snackBar.className = `show`;
    setTimeout(() => {
        snackBar.classList.remove('show');
    }, 5000);
}