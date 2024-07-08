
export function separateId(id) {
    const parts = id.split('-');
    return parseInt(parts[parts.length - 1], 10);
}