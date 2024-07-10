export const createSnackBar = (msg) => {
    return `
        <div class="snack-bar-wrapper">
            ${msg}
        </div>
    `
}

export const deleteSnackBar = () => {
    document.querySelector('.snack-bar-area').remove();
}