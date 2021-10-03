const { Telegraf } = require('telegraf')
const settings = require('./settings')
const db = require('./db')

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

bot.start(ctx => ctx.reply('Hey welcome to TipettinoSurveyBot, here you can answer to the Surveys or create a new one'))
bot.help(ctx => ctx.reply('Send me:\n/survey {id} to answer a survey\n/list {max number of survey(default 5)} to get a list of survey\n/ask {message} to create a new survey'))

bot.on('poll', ctx => {
    let r = ctx.poll.options
    let yes = r[0].voter_count
    let no = r[1].voter_count
    let id = find(ctx.poll.id)
    db.none("UPDATE surveys SET yes = yes + $1, no = no + $2 WHERE id = $3;", [yes, no, id])
        .catch(error => console.log(error))
})

bot.command('survey', ctx => {
    let id = ctx.message.text.split(" ")[1]
    if (!isNaN(parseInt(id))) {
        db.one(`SELECT survey_question FROM surveys WHERE id=${id};`)
            .then(query => {
                ctx.telegram.sendPoll(
                    ctx.chat.id, 
                    query.survey_question, 
                    ["Yes", "No"], 
                    {
                        allows_multiple_answers: false,
                        is_anonymous: true
                    })
                    .then(ret => {
                        add(ret.poll.id, id)
                    })
            })
            .catch(()=> ctx.reply("Survey not found"))
    } else {
        ctx.reply('Error not a valid id')
    }
})

bot.command('list', ctx => {
    let results = 5
    let resM = ctx.message.text.split(/ /g)
    if (resM.length > 1) {
        let r = parseInt(resM[1])
        results = (isNaN(r) ? 5 : r)
    }
    db.any('SELECT survey_question, id FROM surveys ORDER BY id DESC LIMIT $1;', [results])
        .then(data => {
            for(let i = 0; i < data.length; i++) {
                const actData = data[i]
                ctx.telegram.sendPoll(
                    ctx.chat.id, 
                    actData.survey_question, 
                    ["Yes", "No"], 
                    {
                        allows_multiple_answers: false,
                        is_anonymous: true
                    })
                    .then(ret => {
                        add(ret.poll.id, actData.id)
                    })
            }
        })
        .catch(error => console.error(error))
})

bot.command('ask', ctx => {
    let space = ctx.message.text.indexOf(' ')
    if (space == -1) {
        ctx.reply("Send a question")
    } else {
        var question = ctx.message.text.substring(space + 1)
        db.one("INSERT INTO surveys VALUES ($1, 0, 0) RETURNING id;", [question])
            .then((data)=> {
                ctx.reply(`Your survey id is: ${data.id}`)
            })
            .catch(error => console.error(error))
    }
})

module.exports = bot