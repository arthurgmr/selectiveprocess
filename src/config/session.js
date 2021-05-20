const session = require('express-session')
const pgSession = require('connect-pg-simple') (session)
const db = require('./db')

module.exports = session({
    store: new pgSession({
        conString: db
    }),
    secret: '_0#@!($msT',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 10800000
    }
})

