const app = require('./web')
const bot = require('./telegram')
const settings = require('./settings')

const PORT = settings.PORT

app.listen(PORT, ()=> {
    console.log(`Listening on http://localhost:${PORT}`)
})

bot.launch()

process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))