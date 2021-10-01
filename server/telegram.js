const { Telegraf } = require('telegraf')
const settings = require('./settings')
const db = require('./db')
const json3 = require('json3')

const bot = new Telegraf(settings.BOT_TOKEN)

let v = []

const find = (value)=> {
    for (let i = 0; i < v.length; i++) {
        if (v[i].pid == value) {
            let r = v[i].id
            v[i] = v[v.length - 1]
            v.pop()
            return r
        }
    }
}

const add = (pidd, idd) => {
    v.push({
        id: idd,
        pid: pidd
    })
}

bot.start(ctx => ctx.reply('Hey welcome to TipettinoSurveyBot, here you can answer to the Surveys'))
bot.help((ctx) => ctx.reply('Send me /survey {id} to answer a survey'))

bot.on('poll', ctx => {
    let r = ctx.poll.options
    let yes = r[0].voter_count
    let no = r[1].voter_count
    db.none(`UPDATE surveys SET yes = yes + ${yes}, no = no + ${no} WHERE id = ${find(ctx.poll.id)};`)
        .catch(error => console.log(error))
})

bot.command('survey', ctx => {
    let id = ctx.message.text.split(" ")[1]
    if (!isNaN(parseInt(id))) {
        db.any(`SELECT * FROM surveys WHERE id=${id};`)
            .then(query => {
                ctx.telegram.sendPoll(
                    ctx.chat.id, 
                    query[0].survey_question, 
                    ["Yes", "No"], 
                    {
                        allows_multiple_answers: false
                    })
                    .then(ret => {
                        add(ret.poll.id, id)
                    })
            })
    } else {
        ctx.reply('Error not a valid id')
    }
})

module.exports = bot