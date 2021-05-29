const express = require('express')
const nunjucks = require('nunjucks')
const routes = require('./routes')
const methodOverride = require('method-override')
const session = require('./config/session')

const app = express ()

app.use(session)
app.use((req, res, next) => { // global variables
    res.locals.session = req.session // res.locals.session in all template engined
    next()
})

app.use(express.urlencoded({ extended: true })) //responsável por funcionar o require.body
app.use(express.static('public'))
app.use(methodOverride('_method')) //esta dep está sobrescrevendo o tipo do método
app.use(routes)

app.set("view engine", "njk")

nunjucks.configure("src/app/views", {
    express: app,
    autoescape: false,
    noCache: true
})

module.exports = { app }

