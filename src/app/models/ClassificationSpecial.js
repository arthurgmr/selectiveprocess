const db = require('../../config/db')
const Base = require('./Base')

Base.init({ table: 'classification_special' })

module.exports = {
    ...Base,

    async deleteAll(){
        await db.query(`DELETE FROM classification_special`)
    },

    async fixOrdernation() {
        const results = await db.query(`
            SELECT * FROM classification_special
            ORDER BY classification_special.position ASC
        `) 
        return results 
    }

}