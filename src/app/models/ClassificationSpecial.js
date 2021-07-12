const Base = require('./Base')

Base.init({ table: 'classification_special' })

module.exports = {
    ...Base,

    async deleteAll(){
        await db.query(`DELETE FROM classification_special`)
    }

}