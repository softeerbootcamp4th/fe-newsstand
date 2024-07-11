export const getSubscribedCompaniesId = async () => {
    let subscribedCompanies = JSON.parse(localStorage.getItem('subscribedCompanies')) || []
    return subscribedCompanies
}

export const setSubscribedCompaniesId = (subscribedCompanies) => {
    localStorage.setItem('subscribedCompanies', JSON.stringify(subscribedCompanies))
}

export const isSubscribed = async (targetCompanyId) => {
    const subscribedCompanies = await getSubscribedCompaniesId()
    return subscribedCompanies.includes(targetCompanyId)
}

export const handleSubscription = async (targetCompanyId) => {
    if (await isSubscribed(targetCompanyId)) {
        unSubscribe(targetCompanyId)
    } else {
        subscribe(targetCompanyId)
    }
}

export const subscribe = async (targetCompanyId) => {
    if (!targetCompanyId) return

    let subscribedCompaniesId = await getSubscribedCompaniesId()

    // 중복 확인
    if (!subscribedCompaniesId.includes(targetCompanyId)) {
        subscribedCompaniesId.push(targetCompanyId)
        setSubscribedCompaniesId(subscribedCompaniesId)
    }
}

export const unSubscribe = async (targetCompanyId) => {
    if (!targetCompanyId) return

    let subscribedCompaniesId = await getSubscribedCompaniesId()

    // 구독 해지
    subscribedCompaniesId = subscribedCompaniesId.filter((company) => company !== targetCompanyId)
    setSubscribedCompaniesId(subscribedCompaniesId)
}

export const moveToSubscribedCategory = (props) => {
    setTimeout(() => {
        props.setSelectedCategory(props.companyName)
        props.setSelectedSource('내가 구독한 언론사')
        props.setViewType('list')
    }, 1000)
}

export const getSubscribedCompanies = async (wholeCompanyData) => {
    const subscribedIds = await getSubscribedCompaniesId()
    const subscribedCompanies = wholeCompanyData.filter((company) => subscribedIds.includes(company.id))

    return subscribedCompanies
}
