const db = require('../../config/db')
const Base = require('./Base')

Base.init({ table: 'users' })

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
    },

    async search({filter}) {
        
        let query = `
            SELECT users.*, 
                courses.name AS course_name, 
                colleges.name AS college_name
            FROM users
            LEFT JOIN courses ON(courses.id = users.college_id)
            LEFT JOIN colleges ON(colleges.id = users.college_id)
            WHERE 1 = 1
        `
        if(filter) {
            query += `AND users.name ILIKE '%${filter}%'
            OR users.cpf ILIKE '%${filter}%'` 
        }

        const results = await db.query(query)
        return results.rows
    },

    async classification() {
        const results = await db.query (`
        SELECT users.*, 
            courses.name AS course_name, 
            colleges.name AS college_name
        FROM users
        LEFT JOIN courses ON(courses.id = users.college_id)
        LEFT JOIN colleges ON(colleges.id = users.college_id)
        ORDER BY 
            deficient DESC, 
            specialization DESC, 
            period_course DESC, 
            birth_date ASC
        `)
        return results.rows
    }


}