const express = require('express')
const routes = express.Router()

const HomeController = require('../app/controllers/HomeController')
const HomeValidator = require('../app/validators/home')

const { isLoggedRedirectToUsers } = require('../app/middlewares/session')

const users = require('./users')
const usersAdmin = require('./users-admin')
const session = require('./session')

routes.get('/',isLoggedRedirectToUsers, HomeController.index)
routes.post('/', HomeValidator.post, HomeController.post)

routes.use('/users', users)
routes.use('users-admin', usersAdmin)
routes.use('/session', session)

// routes.use('/admin', products) 

routes.get('/accounts', function (req, res) {
        return res.redirect("session/login")
})

module.exports = routes