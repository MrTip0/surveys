module.exports = {
    PORT: process.env.PORT || 8080,
    staticFiles: 'static',
    DB: process.env.DATABASE_URL,
    BOT_TOKEN: process.env.BOT_TOKEN,
    SSL: (process.env.PROCESS_ENVIRONMENT == 'PRODUCTION' ? { rejectUnauthorized: false } : false)
}