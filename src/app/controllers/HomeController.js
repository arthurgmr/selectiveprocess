
const Colleges = require('../models/Colleges')
const Courses = require('../models/Courses')

module.exports = {
    index(req, res) {
        try {
            return res.render("home/index")

        }catch(err) {
            console.log(err)
        }
    },
    async post(req, res) {
        try {
            const colleges = await Colleges.findAll()
            const courses = await Courses.findAll()

            return res.render("users/register", {
                colleges,
                courses,
                user: req.body,
                success: "Preencha os demais campos para validar sua inscrição"
            })
            
        } catch (err) {
            console.log(err)
        }
    }
}