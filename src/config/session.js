const session = require('express-session')
const pgSession = require('connect-pg-simple') (session)

const connectionString = process.env.DATABASE_URL;

module.exports = session({
    store: new pgSession({
        conString: {
            connectionString,
            ssl: true,
        }
    }),
    secret: '_0#@!($msT',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 3600000
    }
})

