export const toastOn = async () => {
    const tostMessage = document.getElementById('toast')

    tostMessage.classList.add('active')
    setTimeout(() => {
        tostMessage.classList.remove('active')
    }, 1000)
}
