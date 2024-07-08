const express = require('express')
const { wholeCompanyData, getCompanyIcon, getCompanyName, getCompanyIdByName, getCompanyDataByPage, getMaxPage } = require('../data/companyData')

const router = express.Router()

router.get('/companies', (req, res) => {
    res.json(wholeCompanyData)
})

router.get('/company/icon/:id', (req, res) => {
    const icon = getCompanyIcon(parseInt(req.params.id))
    if (icon) {
        res.json({ icon })
    } else {
        res.status(404).send('Company not found')
    }
})

router.get('/company/name/:id', (req, res) => {
    const name = getCompanyName(parseInt(req.params.id))
    if (name) {
        res.json({ name })
    } else {
        res.status(404).send('Company not found')
    }
})

router.get('/company/id/:name', (req, res) => {
    const id = getCompanyIdByName(req.params.name)
    if (id) {
        res.json({ id })
    } else {
        res.status(404).send('Company not found')
    }
})

router.get('/companies/page/:page', (req, res) => {
    const page = parseInt(req.params.page)
    const data = getCompanyDataByPage(page)
    res.json(data)
})

router.get('/companies/maxpage', (req, res) => {
    const maxPage = getMaxPage()
    res.json({ maxPage })
})

module.exports = router
