const path = require('path')
const cors = require('cors');
const express = require('express')
const app = express()
const port = 8000

app.use(cors({
    origin: '*',
}));

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/newsList', (req, res) => {
    if (req.query.subAllInfo === "sub") res.sendFile(__dirname + "/data/all.json");
    else res.sendFile(__dirname + "/data/all.json");
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
    console.log(__dirname)
})