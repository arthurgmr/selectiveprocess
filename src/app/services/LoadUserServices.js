const User = require('../models/User')

const { date, formatCpf, formatCep, formatPhone } = require('../../lib/utils')

async function format(user) {
    const { iso } = date(Number(user.birth_date))

    user.cpf = formatCpf(user.cpf)
    user.cep = formatCep(user.cep)
    user.phone1 = formatPhone(user.phone1)
    user.phone2 = formatPhone(user.phone2)
    user.birth_date = iso

    return user
}

async function formatDate(user) {
    const { format } = date(Number(user.birth_date))
    
    user.cpf = formatCpf(user.cpf)
    user.birth_date = format
    user.phone1 = formatPhone(user.phone1)

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
    },
    formatDate
}

module.exports = LoadService