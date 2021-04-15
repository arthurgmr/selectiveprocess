
const User = require('../models/User')

async function post(req, res, next) {

    const keys = Object.keys(req.body)

    for(key of keys) {
        if (req.body[key] == "") {
            return res.render("home/index", {
                user: req.body,
                error: "Por favor, preencha o CPF"
            })
        }                    
    }
    
    let { cpf } = req.body

    cpf = cpf.replace(/\D/g, "");
    
    // check register user
    const user = await User.findOne({ where: {cpf} })
    if(user) return res.render("session/login", {
        error: "CPF já inscrito, acesse com suas credencias."
    })
    
    next()
}

module.exports = {
    post,
}