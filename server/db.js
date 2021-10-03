const settings = require('./settings')
const pgp = require('pg-promise')()

var db = pgp({
    connectionString: settings.DB,
    max: 20,
    ssl: settings.SSL
})

const initialize = `CREATE TABLE IF NOT EXISTS surveys ( survey_question text, yes integer, no integer, id SERIAL UNIQUE PRIMARY KEY);`
db.none(initialize)
    .catch(error => {
        console.error(error);
    })

module.exports = db