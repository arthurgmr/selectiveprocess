const session = require('express-session')
const pgSession = require('connect-pg-simple') (session)
const db = require('./db')

module.exports = session({
    store: new pgSession({
        pool: db
    }),
    secret: '_0#@!($msT',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 3000000000000000
    }
})

