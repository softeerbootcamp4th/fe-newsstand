import { BASE_URL } from '../config.js'

const handleFetchError = (error) => {
    console.error('Fetch error:', error)
    throw error
}

export const fetchAllNewsData = () => {
    return fetch(`${BASE_URL}/api/news`)
        .then((response) => response.json())
        .catch(handleFetchError)
}

export const fetchMediaCategoryData = () => {
    return fetch(`${BASE_URL}/api/news/media-category`)
        .then((response) => response.json())
        .catch(handleFetchError)
}

export const fetchRollingNewsItems = () => {
    return fetch(`${BASE_URL}/api/news/rolling-news`)
        .then((response) => response.json())
        .catch(handleFetchError)
}

export const fetchCategoryNewsData = (category) => {
    return fetch(`${BASE_URL}/api/news/${encodeURIComponent(category)}`)
        .then((response) => response.json())
        .catch(handleFetchError)
}

export const fetchCompanyCount = (category) => {
    return fetch(`${BASE_URL}/api/news/${encodeURIComponent(category)}/company-count`)
        .then((response) => response.json())
        .catch(handleFetchError)
}

export const fetchNewsData = (category, id) => {
    return fetch(`${BASE_URL}/api/news/${encodeURIComponent(category)}/${id}`)
        .then((response) => response.json())
        .catch(handleFetchError)
}

export const fetchSubscribedCompanyNewsData = (subscribedCompanyIdList) => {
    return fetch(`${BASE_URL}/api/news/subscribed`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ subscribedCompanyIdList }),
    })
        .then((response) => response.json())
        .catch(handleFetchError)
}

export const fetchNewsDataFromSubscribedCompany = (subscribedCompanyIdList, category) => {
    return fetch(`${BASE_URL}/api/news/subscribed/${encodeURIComponent(category)}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ subscribedCompanyIdList }),
    })
        .then((response) => response.json())
        .catch(handleFetchError)
}
