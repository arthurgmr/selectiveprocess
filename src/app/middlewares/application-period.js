const Configs = require('../models/Configs');

async function applicationPeriod(req, res, next) {

    //get dateNow
    let dateNow = new Date();
    dateNow = Date.parse(dateNow)

    //get final date application period;
    const configs = await Configs.findOne();
    const finalDate = Number(configs.final_date);

    //get one day mileseconds;
    const oneDay = 1000*60*60*24;

    //if process dont has config;
    if(!finalDate) {
        return res.render("session/login")
    }

    //if dateNow > finalDate return expired period;
    if (dateNow > finalDate + oneDay) {
        return res.render("users/finish-subs")
    }

    next()
}

module.exports = {
    applicationPeriod
}