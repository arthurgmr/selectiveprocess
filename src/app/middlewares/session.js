const User = require('../models/User')

function onlyUsers(req, res, next) {
    if(!req.session.userId && !req.session.userIdAdmin)
        return res.redirect('/session/login')

    next()
}

function onlyUsersAdmin(req, res, next) {
    if(!req.session.userIdAdmin)
        return res.redirect('/session/login')

    next()
}

function isLoggedRedirectToUsers(req, res, next) {
    if (req.session.userId)
        return res.redirect('/users')
    if (req.session.userIdAdmin)
        return res.redirect('/admin')

    next()
}

async function onlyToken(req, res, next) {
    
    const { tk: reset_token } = req.query

    let user = await User.findOne({ where: {reset_token} })

    //check match token
    if(!user) return res.render('users/index', {           
        error: 'Token não confere'
    })

    //check if token has expired
    // let now = new Date()
    // now = now.setHours(now.getHours())

    // if(now > user.reset_token_expires) 
    // return res.render('users/index', {         
    //     error: 'Token expirado'
    // })
    
    req.user = user

    next()
}

module.exports = {
    onlyUsers,
    onlyUsersAdmin,
    isLoggedRedirectToUsers,
    onlyToken
}