const express = require('express')
const routes = express.Router()

const AdminController = require('../app/controllers/AdminController')

routes.get('/', AdminController.index)

routes.get('/search', AdminController.indexSearch)
routes.get('/search-', AdminController.search)

routes.get('/configs', AdminController.configs)
routes.post('/configs', AdminController.configsCreateAndEdit)
routes.delete('/configs', AdminController.configsDelete)

// routes.get('/print-form/:id', onlyUsers, UserController.printForm)
// routes.get('/print-form/:id/pdf',onlyUsers, UserController.formPdf)
// routes.get('/edit', onlyUsers, UserController.edit)
// routes.put('/edit', onlyUsers, UserValidator.put, UserController.put)
// routes.delete('/', UserController.delete)

module.exports = routes