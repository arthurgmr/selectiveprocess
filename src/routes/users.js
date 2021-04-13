const express = require('express')
const routes = express.Router()

const UserController = require('../app/controllers/UserController')

const UserValidator = require('../app/validators/user')

const { onlyUsers }= require('../app/middlewares/session')


// //user register
routes.get('/register', UserController.registerForm)
routes.post('/register', UserValidator.post, UserController.post)

routes.get('/', onlyUsers, UserValidator.index, UserController.index)
// routes.get('/print-form/:id', onlyUsers, UserController.printForm)
// routes.get('/print-form/:id/pdf',onlyUsers, UserController.formPdf)
routes.get('/edit', onlyUsers, UserController.edit)
routes.put('/edit',onlyUsers, UserValidator.put, UserController.put)
// routes.put('/edit', onlyUsers, UserValidator.put, UserController.put)
// routes.delete('/', UserController.delete)

module.exports = routes