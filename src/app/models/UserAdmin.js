const db = require('../../config/db')
const Base = require('./Base')

Base.init({ table: 'users_admin' })

module.exports = {
    ...Base,

}