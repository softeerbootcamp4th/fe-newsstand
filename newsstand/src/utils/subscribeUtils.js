export const getSubscribedCompanies = () => {
    return JSON.parse(localStorage.getItem('subscribedCompanies')) || []
}

export const setSubscribedCompanies = (subscribedCompanies) => {
    localStorage.setItem('subscribedCompanies', JSON.stringify(subscribedCompanies))
}

export const isSubscribed = (targetCompanyName) => {
    const subscribedCompanies = getSubscribedCompanies()
    return subscribedCompanies.includes(targetCompanyName)
}

export const handleSubscription = (targetCompanyName) => {
    if (isSubscribed(targetCompanyName)) {
        unSubscribe(targetCompanyName)
    } else {
        subscribe(targetCompanyName)
    }
}

export const subscribe = (targetCompanyName) => {
    let subscribedCompanies = getSubscribedCompanies()
    subscribedCompanies.push(targetCompanyName)
    setSubscribedCompanies(subscribedCompanies)
}

export const unSubscribe = (targetCompanyName) => {
    let subscribedCompanies = getSubscribedCompanies()
    subscribedCompanies = subscribedCompanies.filter((company) => company !== targetCompanyName)
    setSubscribedCompanies(subscribedCompanies)
}
