export const changeIconByFoundation = (originPath) => {
    const foundation = localStorage.getItem('foundation')
    let companyIconPath = String(originPath)
    companyIconPath = companyIconPath.replace('company/', `company/${foundation}/`)
    return companyIconPath
}
