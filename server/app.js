const app = require('./web')
const bot = require('./telegram')
const settings = require('./settings')

const PORT = settings.PORT

app.listen(PORT, ()=> {
    console.log(`Listening on port ${PORT}`)
})

bot.start()

process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))