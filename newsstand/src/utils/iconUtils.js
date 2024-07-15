export const changeIconByFoundation = (originPath, foundation) => {
    let companyIconPath = String(originPath)
    companyIconPath = companyIconPath.replace('company/', `company/${foundation}/`)
    return companyIconPath
}
