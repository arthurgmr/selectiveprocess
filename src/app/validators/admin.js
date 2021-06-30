
const User = require('../models/User')
const Colleges = require('../models/Colleges')
const Courses = require('../models/Courses')

async function editUser (req, res, next) {
    const colleges = await Colleges.findAll()
    const courses = await Courses.findAll() 
    
    //check if has all fields
    let keys = Object.keys(req.body)

    keys = keys.filter(key => key !== 'address_complement' && key !== 'phone2')

    for(key of keys) {
        if (req.body[key] == "") {
            return res.render("users/edit", {
                user: req.body,
                colleges,
                courses,
                error: 'Os campos obrigatórios não foram preenchidos.'
            })
        }           
    }
    const { id } = req.params

    const user = await User.findOne({ where: {id} })

    req.user = user

    next()
}

module.exports = {
    editUser
}