const express = require('express')
const cors = require('cors')

const companyRoutes = require('./routes/companyRoutes')
const newsRoutes = require('./routes/newsRoutes')

const app = express()
app.use(cors())
const PORT = process.env.PORT || 3000

app.use('/api', companyRoutes)
app.use('/api', newsRoutes)

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})
