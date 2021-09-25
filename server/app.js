const express = require('express')
const path = require('path')

const settings = require('./settings')
const app = express()

const PORT = settings.PORT

app.use(express.static(path.join(__dirname, `../${settings.staticFiles}`)))
app.use(express.json())

app.listen(PORT, ()=> {
    console.log(`Listening on http://localhost:${PORT}`)
})