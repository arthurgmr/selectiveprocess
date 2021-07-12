const express = require('express')
const routes = express.Router()

const HomeController = require('../app/controllers/HomeController')
const HomeValidator = require('../app/validators/home')
const AdminController = require('../app/controllers/AdminController')

const { applicationPeriod } = require('../app/middlewares/application-period')
const { onlyUsersAdmin, isLoggedRedirectToUsers } = require('../app/middlewares/session')

const admin = require('./admin')
const users = require('./users')
const session = require('./session')

routes.get('/', applicationPeriod, isLoggedRedirectToUsers, HomeController.index)
routes.post('/',applicationPeriod, HomeValidator.post, HomeController.post)

routes.use('/users', users)

routes.use('/admin', onlyUsersAdmin, admin)
routes.use('/clf/regular', AdminController.printClfRegular)
routes.use('/clf/especial', AdminController.printClfSpecial)

routes.use('/session', session)

// routes.use('/admin', products) 

routes.get('/accounts', function (req, res) {
        return res.redirect("session/login")
})

module.exports = routes