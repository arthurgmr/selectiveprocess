const User = require('../models/User')

const { date } = require('../../lib/utils')

async function format(user) {
    const { iso } = date(Number(user.birth_date))
    
    user.birth_date = iso

    return user
}

const LoadService = {
    load(service, filter) {
        this.filter = filter
        return this[service] ()
    },
    async user() {
        try {
            const user = await User.findOne(this.filter)
            return format(user)

        } catch (err) {
            console.log(err)
        }
    },
    async userDataComplete() {
        try {
            const user = await User.findUserComplete(this.filter)
            return format(user)

        } catch (err) {
            console.log(err)
        }
    }
}

module.exports = LoadService