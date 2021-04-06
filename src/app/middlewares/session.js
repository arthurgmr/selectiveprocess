function onlyUsers(req, res, next) {
    if(!req.session.userId && !req.session.userIdAdmin)
        return res.redirect('/session/login')

    next()
}

function isLoggedRedirectToUsers(req, res, next) {
    if (req.session.userId && !req.session.userIdAdmin)
        return res.redirect('/users')

    next()
}

module.exports = {
    onlyUsers,
    isLoggedRedirectToUsers
}