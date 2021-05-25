const session = require('express-session');
const db = require('./db');
const MariaDBStore = require('express-session-mariadb-store')

module.exports = session({
    store: new MariaDBStore({
        user: 'arthurgmr',
        password: '123456'
    }),
    secret: '_0#@!($msT',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 3600000
    }
})

