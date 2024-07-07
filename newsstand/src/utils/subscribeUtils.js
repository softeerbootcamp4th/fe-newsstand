export const getSubscribedCompaniesId = () => {
    return JSON.parse(localStorage.getItem('subscribedCompanies')) || []
}

export const setSubscribedCompaniesId = (subscribedCompanies) => {
    localStorage.setItem('subscribedCompanies', JSON.stringify(subscribedCompanies))
}

export const isSubscribed = (targetCompanyId) => {
    const subscribedCompanies = getSubscribedCompaniesId()
    return subscribedCompanies.includes(targetCompanyId)
}

export const handleSubscription = (targetCompanyId) => {
    if (isSubscribed(targetCompanyId)) {
        unSubscribe(targetCompanyId)
    } else {
        subscribe(targetCompanyId)
    }
}

export const subscribe = (targetCompanyId) => {
    let subscribedCompaniesId = getSubscribedCompaniesId()
    subscribedCompaniesId.push(targetCompanyId)
    setSubscribedCompaniesId(subscribedCompaniesId)
}

export const unSubscribe = (targetCompanyId) => {
    let subscribedCompaniesId = getSubscribedCompaniesId()
    subscribedCompaniesId = subscribedCompaniesId.filter((company) => company !== targetCompanyId)
    setSubscribedCompaniesId(subscribedCompaniesId)
}

export const getSubscribedCompanies = (wholeCompanyData) => {
    const subscribedIds = getSubscribedCompaniesId()
    const subscribedCompanies = wholeCompanyData.filter((company) => subscribedIds.includes(company.id))

    return subscribedCompanies
}
