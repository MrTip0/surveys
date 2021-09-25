const express = require('express')
const path = require('path')
var pgp = require('pg-promise')()

const settings = require('./settings')
const app = express()

const initialize = `
    CREATE TABLE surveys ( survey_question text, yes integer, no integer, id integer PRIMARY KEY);`

let db = pgp({
    connectionString: settings.DB,
    ssl: true,
    max: 20
})
let n = 0


db.none(initialize)
    .catch(error => {
        console.error(error);
    })
db.any(`SELECT COUNT(*) FROM surveys;`)
    .then(value => {
        n = value
        console.log("the table is ready")
    })
    .catch(reason => console.error(reason))

const PORT = settings.PORT

app.use(express.static(path.join(__dirname, `../${settings.staticFiles}`)))
app.use(express.json())

app.post('/add-survey', (req, res)=> {
    db.none(`INSERT INTO surveys VALUES ('${req.body.question}', 0, 0, '${n}');`)
    n += 1
    res.send(n - 1)
})

app.get('/get-survey', async(req, res) => {
    res.send(res.json(await db.any(`SELECT * FROM surveys WHERE id = ${req.query.id};`)))
})

app.post('createSurvey')

app.listen(PORT, ()=> {
    console.log(`Listening on http://localhost:${PORT}`)
})