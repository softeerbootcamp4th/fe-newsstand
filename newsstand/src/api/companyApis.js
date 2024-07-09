import { BASE_URL } from '../config.js'

const handleFetchError = (error) => {
    console.error('Fetch error:', error)
    throw error
}

export const fetchWholeCompanyData = () => {
    return fetch(`${BASE_URL}/api/companies`)
        .then((response) => response.json())
        .catch(handleFetchError)
}

export const fetchCompanyIcon = (companyId) => {
    return fetch(`${BASE_URL}/api/company/icon/${companyId}`)
        .then((response) => response.json())
        .catch(handleFetchError)
}

export const fetchCompanyName = (companyId) => {
    return fetch(`${BASE_URL}/api/company/name/${companyId}`)
        .then((response) => response.json())
        .catch(handleFetchError)
}

export const fetchCompanyIdByName = (companyName) => {
    return fetch(`${BASE_URL}/api/company/id/${encodeURIComponent(companyName)}`)
        .then((response) => response.json())
        .catch(handleFetchError)
}

export const fetchCompanyDataByPage = (page) => {
    return fetch(`${BASE_URL}/api/companies/page/${page}`)
        .then((response) => response.json())
        .catch(handleFetchError)
}

export const fetchMaxPageNumber = () => {
    return fetch(`${BASE_URL}/api/companies/maxpage`)
        .then((response) => response.json())
        .catch(handleFetchError)
}
