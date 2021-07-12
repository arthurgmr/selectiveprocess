const db = require('../../config/db')
const Base = require('./Base')

Base.init({ table: 'classification_regular' })

module.exports = {
    ...Base,

    async deleteAll(){
        await db.query(`DELETE FROM classification_regular`)
    },

    async fixOrdernation() {
        const results = await db.query(`
            SELECT * FROM classification_regular
            ORDER BY classification_regular.position ASC
        `) 
        return results 
    }

}