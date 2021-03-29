const { compare } = require('bcryptjs')
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
                error: 'Por favor, preencha os campos obrigatórios'
            }
        }           
    }
}


async function index(req, res, next) {
    const { userId: id } = req.session

    const user = await User.findOne({where: {id}})

        if (!user) return res.render("users/register", {
            error: "Usuário não encontrado"
        })

        req.user = user

    next()
}

async function post(req, res, next) {
    //check if has all fields
    const fillAllFields = checkAllFields(req.body)
    if(fillAllFields) {
        return res.render("users/register", fillAllFields)
    }
        

    let { email, cpf, password, passwordRepeat } = req.body
    cpf = cpf.replace(/\D/g,"")

    //check if user exists [email cpf_cnpj]    
    const user = await User.findOne({
        where: {email},
        or: {cpf}
    })

    const colleges = await Colleges.findAll()
    const courses = await Courses.findAll() 

    if(user) return res.render('users/register', {
        user: req.body,
        colleges,
        courses,
        error: 'CPF ou E-mail já cadastrados!'
    })

    //check if passwords match
    if(password != passwordRepeat)
        return res.render('users/register', {
            user: req.body, 
            colleges,
            courses,                       
            error: 'As senhas não conferem!'
        })

    next()
}

async function update (req, res, next) {
    //check if has all fields
    const fillAllFields = checkAllFields(req.body)
    if(fillAllFields) {
        return res.render("users/index", fillAllFields)
    }

    const { id, password } = req.body

    if(!password) return res.render("users/index", {
        user: req.body,
        error: "Type your password to register update."
    })

    const user = await User.findOne({ where: {id} })

    const passed = await compare(password, user.password)

    if (!passed) return res.render("users/index", {
        user: req.body,
        error: "Incorrect password!"
    })

    req.user = user

    next()
}

module.exports = {
    post,
    index,
    update
}