const express = require('express')
const routes = express.Router()

const HomeController = require('../app/controllers/HomeController')
const HomeValidator = require('../app/validators/home')

const users = require('./users')

routes.get('/', HomeController.index)
routes.post('/', HomeValidator.post, HomeController.post)

// routes.use('/admin', products)      
routes.use('/users', users)

routes.get('/accounts', function (req, res) {
        return res.redirect("users/login")
})

module.exports = routes