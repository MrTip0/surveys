const express = require('express')
const json3 = require('json3')
const path = require('path')
const db = require('./db')

const settings = require('./settings')
const app = express()

let n = 0

db.any(`SELECT * FROM surveys;`)
        .then(value => {
            n = parseInt(value.length)
            console.log(`the table is ready`)
        })
        .catch(reason => console.error(reason))

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static(path.join(__dirname, `../${settings.staticFiles}`)))

app.post('/add-survey', (req, res)=> {
    db.none(`INSERT INTO surveys VALUES ('${req.body.question.replace(/'/g, '"')}', 0, 0, ${n});`)
        .then(()=> {
            n += 1
            res.send((n - 1).toString())
        })
        .catch(error => console.error(error))
})

app.get('/get-survey', (req, res) => {
    if (isNaN(parseInt(req.query.id))) {
        res.send('error')
    } else {
        db.any(`SELECT * FROM surveys WHERE id = ${req.query.id};`)
            .then(value => {
                res.send(json3.stringify(value[0]))
            })
    }
})

app.get('/vote', (req, res) => {
    db.none(`UPDATE surveys SET ${req.query.response == 'yes'? 'yes = yes + 1' : 'no = no + 1'} WHERE id = ${req.query.id};`)
        .then(()=> res.send('successful'))
        .catch(()=> res.send('error'))
})

app.get('/lastIndex', (req, res) => {
    res.send(n.toString())
})

app.use((req, res) => {
    res.sendFile(path.join(__dirname, `../${settings.staticFiles}/index.html`))
})

module.exports = app