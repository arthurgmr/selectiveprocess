const express = require('express')
const routes = express.Router()

const HomeController = require('../app/controllers/HomeController')
const HomeValidator = require('../app/validators/home')

const { onlyUsersAdmin, isLoggedRedirectToUsers } = require('../app/middlewares/session')

const admin = require('./admin')
const users = require('./users')
const session = require('./session')

routes.get('/',isLoggedRedirectToUsers, HomeController.index)
routes.post('/', HomeValidator.post, HomeController.post)

routes.use('/users', users)
routes.use('/admin', onlyUsersAdmin, admin)
routes.use('/session', session)

// routes.use('/admin', products) 

routes.get('/accounts', function (req, res) {
        return res.redirect("session/login")
})

module.exports = routes