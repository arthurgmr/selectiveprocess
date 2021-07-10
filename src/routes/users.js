const express = require('express')
const routes = express.Router()

const UserController = require('../app/controllers/UserController')

const UserValidator = require('../app/validators/user')

const { onlyUsers, onlyToken } = require('../app/middlewares/session')
const { applicationPeriod } = require('../app/middlewares/application-period')


// //user register
routes.get('/register', applicationPeriod, UserController.registerForm)
routes.post('/register', applicationPeriod, UserValidator.post, UserController.post)

// dashboard
routes.get('/', onlyUsers, UserValidator.index, UserController.index)

//print form
routes.get('/print-form', onlyUsers, UserController.printForm)
routes.get('/print-form/pdf',onlyUsers, UserController.formPdf)
routes.get('/format-pdf', onlyToken, UserController.formatPdf)

// edit user
routes.get('/edit', applicationPeriod, onlyUsers, UserController.edit)
routes.put('/edit', onlyUsers, UserValidator.put, UserController.put)
// routes.put('/edit', onlyUsers, UserValidator.put, UserController.put)
// routes.delete('/', UserController.delete)

module.exports = routes