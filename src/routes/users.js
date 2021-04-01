const express = require('express')
const routes = express.Router()

const SessionController = require('../app/controllers/SessionController')
const UserController = require('../app/controllers/UserController')

const UserValidator = require('../app/validators/user')
const SessionValidator = require('../app/validators/session')
const { isLoggedRedirectToUsers } = require('../app/middlewares/session')
const { onlyUsers }= require('../app/middlewares/session')


// //user register
routes.get('/register', UserController.registerForm)
routes.post('/register', UserValidator.post, UserController.post)

routes.get('/', onlyUsers, UserValidator.index, UserController.index)
routes.get('/print-form', onlyUsers, UserValidator.index, UserController.printForm)
routes.get('/edit', onlyUsers, UserController.edit)
routes.put('/edit', onlyUsers, UserValidator.put, UserController.put)
// routes.put('/', UserValidator.update, UserController.update)
// routes.delete('/', UserController.delete)


module.exports = routes