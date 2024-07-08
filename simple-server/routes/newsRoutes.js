const express = require('express')
const {
    mediaCategoryData,
    rollingNewsItems,
    allNewsData,
    getCategoryNewsData,
    getCompanyCount,
    getNewsData,
    getSubscribedCompanyNewsData,
    getNewsDataFromSubscribedCompany,
} = require('../data/newsData')

const router = express.Router()

router.get('/news', (req, res) => {
    res.json(allNewsData)
})

router.get('/news/media-category', (req, res) => {
    res.json(mediaCategoryData)
})

router.get('/news/rolling-news', (req, res) => {
    res.json(rollingNewsItems)
})

router.get('/news/:category', (req, res) => {
    const category = req.params.category
    const newsData = getCategoryNewsData(category)
    res.json(newsData)
})

router.get('/news/:category/company-count', (req, res) => {
    const category = req.params.category
    const count = getCompanyCount(category)
    res.json({ count })
})

router.get('/news/:category/:id', (req, res) => {
    const category = req.params.category
    const id = parseInt(req.params.id)
    const newsData = getNewsData(category, id)
    if (newsData) {
        res.json(newsData)
    } else {
        res.status(404).json({ error: `News with category '${category}' and ID '${id}' not found.` })
    }
})

router.post('/news/subscribed', (req, res) => {
    const subscribedCompanyIdList = req.body.subscribedCompanyIdList
    const subscribedCompanyNewsData = getSubscribedCompanyNewsData(subscribedCompanyIdList)
    res.json(subscribedCompanyNewsData)
})

router.post('/news/subscribed/:category', (req, res) => {
    const subscribedCompanyIdList = req.body.subscribedCompanyIdList
    const category = req.params.category
    const newsData = getNewsDataFromSubscribedCompany(subscribedCompanyIdList, category)
    if (newsData) {
        res.json(newsData)
    } else {
        res.status(404).json({ error: `News with category '${category}' from subscribed companies not found.` })
    }
})

module.exports = router
