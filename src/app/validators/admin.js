
const Colleges = require('../models/Colleges')
const Courses = require('../models/Courses')
const User = require('../models/User')

function checkAllFields(body) {
    //check if has all fields
    const keys = Object.keys(body)

    for(key of keys) {
        if (body[key] == "") {
            return {
                user: body,
                error: 'Os campos obrigatórios não foram preenchidos.'
            }
        }           
    }
}


async function editUser (req, res, next) {
    //check if has all fields;
    const fillAllFields = checkAllFields(req.body)
    if(fillAllFields) {
        return res.render("users/edit", fillAllFields)
    }

    const { id } = req.params

    const user = await User.findOne({ where: {id} })

    req.user = user

    next()
}

module.exports = {
    editUser
}