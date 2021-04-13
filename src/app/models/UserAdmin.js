const db = require('../../config/db')
const Base = require('./Base')

Base.init({ table: 'user_admin' })

module.exports = {
    ...Base,

}