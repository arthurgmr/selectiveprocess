const express = require('express')
const routes = express.Router()

const AdminController = require('../app/controllers/AdminController')

const { onlyUsers }= require('../app/middlewares/session')


routes.get('/', onlyUsers, AdminController.index)

// routes.get('/print-form/:id', onlyUsers, UserController.printForm)
// routes.get('/print-form/:id/pdf',onlyUsers, UserController.formPdf)
// routes.get('/edit', onlyUsers, UserController.edit)
// routes.put('/edit', onlyUsers, UserValidator.put, UserController.put)
// routes.delete('/', UserController.delete)

module.exports = routes