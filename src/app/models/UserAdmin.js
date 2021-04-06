const db = require('../../config/db')
const Base = require('./Base')

Base.init({ table: 'user_admin' })

module.exports = {
    ...Base,

    async findUserComplete(id) {
        const results = await db.query (`
        SELECT users.*, 
            courses.name AS course_name, 
            colleges.name AS college_name
        FROM users
        LEFT JOIN courses ON(courses.id = users.college_id)
        LEFT JOIN colleges ON(colleges.id = users.college_id)
        WHERE users.id = $1`, [id])

        return results.rows[0]
    }


}