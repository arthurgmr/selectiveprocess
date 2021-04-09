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

module.exports = {
    onlyUsers,
    onlyUsersAdmin,
    isLoggedRedirectToUsers
}