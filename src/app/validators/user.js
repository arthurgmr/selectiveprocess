const { compare } = require('bcryptjs')
const Colleges = require('../models/Colleges')
const Courses = require('../models/Courses')
const User = require('../models/User')

function checkAllFields(body) {
    //check if has all fields
    let keys = Object.keys(body)
    
    keys = keys.filter(key => key !== 'address_complement' && key !== 'phone2')

    for(key of keys) {
        if (body[key] == "") {
            return {
                user: body,
                error: 'Os campos obrigatórios não foram preenchidos.'
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
    const colleges = await Colleges.findAll()
    const courses = await Courses.findAll() 
    
    //check if has all fields
    let keys = Object.keys(req.body)

    keys = keys.filter(key => key !== 'address_complement' && key !== 'phone2')

    for(key of keys) {
        if (req.body[key] == "") {
            return res.render("users/register", {
                user: req.body,
                colleges,
                courses,
                error: 'Os campos obrigatórios não foram preenchidos.'
            })
        }           
    }

    let { email, cpf, password, passwordRepeat } = req.body
    
    email = email.toLowerCase()
    cpf = cpf.replace(/\D/g,"")

    //check if user exists [email cpf_cnpj]    
    const user = await User.findOne({
        where: {email},
        or: {cpf}
    })

    if(user) return res.render('users/register', {
        user: req.body,
        colleges,
        courses,
        error: 'CPF ou E-mail já cadastrados'
    })

    //check if passwords match
    if(password != passwordRepeat)
        return res.render('users/register', {
            user: req.body, 
            colleges,
            courses,                       
            error: 'As senhas não conferem'
        })

    next()
}

async function put(req, res, next) {
    const colleges = await Colleges.findAll()
    const courses = await Courses.findAll() 
    
    //check if has all fields
    let keys = Object.keys(req.body)

    keys = keys.filter(key => key !== 'address_complement' && key !== 'phone2')

    for(key of keys) {
        if (req.body[key] == "") {
            return res.render("users/register", {
                user: req.body,
                colleges,
                courses,
                error: 'Os campos obrigatórios não foram preenchidos.'
            })
        }           
    }

    const { id, password } = req.body

    if(!password) return res.render("users/edit", {
        colleges,
        courses,
        user: req.body,
        error: "Digite sua senha para atualizar as informações"
    })

    const user = await User.findOne({ where: { id } })

    const passed = await compare(password, user.password)

    if (!passed) return res.render("users/edit", {
        colleges,
        courses,
        user: req.body,
        error: "Senha incorreta"
    })

    req.user = user

    next()
}

module.exports = {
    post,
    index,
    put
}