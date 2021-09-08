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

routes.get('/configs', AdminController.indexConfigs)

routes.get('/configs/colleges', AdminController.indexColleges)
routes.get('/configs/colleges/create', AdminController.formCollege)
routes.post('/configs/colleges/create', AdminController.collegeCreate)
routes.get('/configs/colleges/:id', AdminController.collegeShow)
routes.put('/configs/colleges/:id', AdminController.collegeEdit)
routes.delete('/configs/colleges', AdminController.collegeDelete)

routes.get('/configs/data', AdminController.configs)
routes.post('/configs/data', AdminController.configsCreateAndEdit)
routes.delete('/configs/data', AdminController.configsDelete)

routes.get('/classification', AdminController.chooseClassification)
routes.get('/classification/regular', AdminController.showClassificationRegular)
routes.post('/classification/regular', AdminController.generateClassifRegular)
routes.get('/classification/special', AdminController.showClassificationSpecial)
routes.post('/classification/special', AdminController.generateClassifSpecial)



module.exports = routes