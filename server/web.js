const express = require('express')
const json3 = require('json3')
const path = require('path')
const db = require('./db')

const settings = require('./settings')
const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static(path.join(__dirname, `../${settings.staticFiles}`)))

app.post('/add-survey', (req, res)=> {
    db.one("INSERT INTO surveys VALUES ($1, 0, 0) RETURNING id;", [req.body.question])
        .then((data)=> {
            res.send(data.id.toString())
        })
        .catch(error => console.error(error))
})

app.get('/get-survey', (req, res) => {
    if (isNaN(parseInt(req.query.id))) {
        res.send('error')
    } else {
        db.one("SELECT * FROM surveys WHERE id = $1;", [req.query.id])
            .then(value => {
                res.send(json3.stringify(value))
            })
    }
})

app.get('/vote', (req, res) => {
    db.none(`UPDATE surveys SET ${req.query.response == 'yes'? 'yes = yes + 1' : 'no = no + 1'} WHERE id = $1;`, [req.query.id])
        .then(()=> res.send('successful'))
        .catch((error)=> {
            res.send('error')
            console.error(error);
        })
})

app.get('/list', (req, res) => {
    db.any('SELECT id FROM surveys;')
        .then(result => {
            res.send(json3.stringify(result))
        })
        .catch(error => {
            console.log(error)
        })
})

app.use((req, res) => {
    res.sendFile(path.join(__dirname, `../${settings.staticFiles}/index.html`))
})

module.exports = app