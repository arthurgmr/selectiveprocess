const Configs = require('../models/Configs');

async function applicationPeriod(req, res, next) {

    //get dateNow
    let dateNow = new Date();
    dateNow = Date.parse(dateNow)
    console.log(dateNow)


    //get final date application period;
    const configs = await Configs.findOne();
    const finalDate = configs.final_date;

    //if dateNow > finalDate return expired period;
    if (dateNow > finalDate) {
        return res.render("users/finish-subs")
    }

    next()
}

module.exports = {
    applicationPeriod
}