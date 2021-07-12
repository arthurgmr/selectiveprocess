const db = require('../../config/db')
const Base = require('./Base')

Base.init({ table: 'classification_regular' })

module.exports = {
    ...Base,

    async deleteAll(){
        await db.query(`DELETE FROM classification_regular`)
    }

}