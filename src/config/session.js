const session = require('express-session');
const db = require('./db');
const pgSession = require('connect-pg-simple') (session)

module.exports = session({
    store: new pgSession({
        pool: db,
        tableName: "session"
    }),
    secret: '_0#@!($msT',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 3600000
    }
})

