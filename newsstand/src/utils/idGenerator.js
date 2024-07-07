export const generateRandomId = (length) => {
    return '-' + Math.random().toString(36).slice(2, length)
}
