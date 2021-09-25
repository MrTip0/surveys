var express = require('express')
const json3 = require('json3')
const path = require('path')
var pgp = require('pg-promise')()

const settings = require('./settings')
var app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static(path.join(__dirname, `../${settings.staticFiles}`)))

const PORT = settings.PORT


var db = pgp({
    connectionString: settings.DB,
    max: 20
})
let n = 0

const initialize = `CREATE TABLE IF NOT EXISTS surveys ( survey_question text, yes integer, no integer, id integer PRIMARY KEY);`
db.none(initialize)
    .then(()=> {
        db.any(`SELECT * FROM surveys;`)
        .then(value => {
            n = parseInt(value.length)
            console.log(`the table is ready`)
        })
        .catch(reason => console.error(reason))
    })
    .catch(error => {
        console.error(error);
    })

app.post('/add-survey', (req, res)=> {
    db.none(`INSERT INTO surveys VALUES ('${req.body.question}', 0, 0, '${n}');`)
    n += 1
    res.send((n - 1).toString())
})

app.get('/get-survey', (req, res) => {
    db.any(`SELECT * FROM surveys WHERE id = ${req.query.id};`)
    .then(value => {
        res.send(json3.stringify(value[0]))
    })
})

app.get('/vote', (req, res) => {
    db.none(`UPDATE surveys SET ${req.query.response == 'yes'? 'yes = yes + 1' : 'no = no + 1'} WHERE id = ${req.query.id};`)
        .then(()=> res.send('successful'))
        .catch(()=> res.send('error'))
})

app.post('createSurvey')

app.listen(PORT, ()=> {
    console.log(`Listening on http://localhost:${PORT}`)
})