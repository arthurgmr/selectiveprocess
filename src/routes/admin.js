const express = require('express')
const routes = express.Router()

const AdminController = require('../app/controllers/AdminController')
const AdminValidator = require('../app/validators/admin')

routes.get('/', AdminController.index)


routes.get('/search', AdminController.indexSearch)
routes.get('/search-', AdminController.search)

routes.get('/user/:id', AdminController.showUser)
routes.put('/user/:id', AdminValidator.editUser, AdminController.putUser)
routes.delete('/user', AdminController.deleteUser)

routes.get('/configs', AdminController.configs)
routes.post('/configs', AdminController.configsCreateAndEdit)
routes.delete('/configs', AdminController.configsDelete)

routes.get('/classification', AdminController.chooseClassification)
routes.get('/classification/regular', AdminController.showClassificationRegular)
routes.post('/classification/regular', AdminController.generateClassifRegular)
routes.get('/classification/special', AdminController.showClassificationSpecial)



module.exports = routes