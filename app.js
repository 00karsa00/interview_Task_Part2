const express = require('express')
const app = express()
const cors = require('cors')

app.use(cors())

app.use(express.json())
app.use(express.urlencoded({ extended: true, limit: '50mb' }))

app.use('/', require('./src/router'))

app.listen(4000, () => {
    console.log("Server start 4000")
}) 