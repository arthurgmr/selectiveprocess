const session = require('express-session')
const pgSession = require('connect-pg-simple') (session)

module.exports = session({
    store: new pgSession({
        conString: process.even.DATABASE_URL
    }),
    secret: '_0#@!($msT',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 10800000
    }
})

