export const shuffle = (array) => {
    array.sort(() => Math.random() - 0.5)
    return array
}

export const isIn = (target, array) => {
    return array.includes(target)
}

export const getNextIndexInList = (target, array) => {
    const targetIndex = array.indexOf(target)

    if (targetIndex === -1) {
        return -1
    }

    const nextIndex = (targetIndex + 1) % array.length
    return nextIndex
}

export const getPrevIndexInList = (target, array) => {
    const targetIndex = array.indexOf(target)

    if (targetIndex === -1) {
        return -1
    }

    const prevIndex = (targetIndex - 1 + array.length) % array.length
    return prevIndex
}
