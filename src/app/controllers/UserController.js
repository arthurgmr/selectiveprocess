const { hash} = require('bcryptjs')

const User = require('../models/User')
const Colleges = require('../models/Colleges')
const Courses = require('../models/Courses')
const { index } = require('./HomeController')




module.exports = {
    async registerForm(req, res) {
        const colleges = await Colleges.findAll()
        const courses = await Courses.findAll()

        return res.render("users/register", { colleges, courses })
    },
    async index(req, res) {
        try {
            const { user } = req

            return res.render('users/index', { user })
        } catch (err) {
            console.log(err)
        }
    },
    // async show(req, res) {
    //     try {
    //         const { user } = req

    //         user.cpf_cnpj = formatCpfCnpj(user.cpf_cnpj)
    //         user.cep = formatCep(user.cep)
            
    //         return res.render('users/index', { user })

    //     }catch(err) {
    //         console.log(err)
    //     }
    // },
    async post (req, res) {
        try {
            let {
                name,
                cpf,
                birth_date,
                cep,
                address,
                address_number,
                address_district,
                course_id,
                college_id,
                period_course,
                specialization,
                email,
                phone,
                password
            } = req.body

            name.toUpperCase()
            address.toUpperCase()
            address_district.toUpperCase()
            birth_date = Date.parse(birth_date)
            password = await hash(password, 8)
            cpf.replace(/\D/g, "")
            cep.replace(/\D/g, "")

            const userId = await User.create({
                name,
                cpf,
                birth_date,
                cep,
                address,
                address_number,
                address_district,
                course_id,
                college_id,
                period_course,
                specialization,
                email,
                phone,
                password
            })
            
            return res.render('users/success')

        }catch(err) {
            console.log(err)
        }

    },
    // async update(req, res ){
    //     try {
    //         const { user } = req
    //         let { name, email, cpf_cnpj, cep, address} = req.body

            
    //         cpf_cnpj = cpf_cnpj.replace(/\D/g,"")
    //         cep = cep.replace(/\D/g,"")

    //         await User.update(user.id, {
    //             name,
    //             email,
    //             cpf_cnpj,
    //             cep,
    //             address
    //         })

    //         return res.render("users/index", {
    //             user: req.body,
    //             success: "User updated with success!"
    //         })

    //     }catch(err) {
    //         console.log(err)
    //         return res.render("users/index", {
    //             error: "Some error happened!"
    //         })
    //     }
    // },
    // async delete(req, res) {
    //     try {
            
    //         const products = await Product.findAll({where: {user_id: req.body.id}})

    //         //get all images of products
    //         const allFilesPromise = products.map(product => 
    //             Product.files(product.id))
                
    //         let promiseResults = await Promise.all(allFilesPromise)

    //         //remove user
    //         await User.delete(req.body.id)
    //         req.session.destroy()

    //         //remove images from public folder
    //         promiseResults.map(files => {
    //             files.map(file => unlinkSync(file.path))
    //         })

    //         return res.render("session/login", {
    //             success: "Account Successfully Deleted"
    //         })    

    //     }catch(err) {
    //         console.log(err)
    //         return res.render("users/index", {
    //             user: req.body,
    //             error: "Some error happened!"
    //         })
    //     }
    // },
    // async ads(req, res) {
    //     const products = await LoadProductService.load('products', {
    //         where: { user_id: req.session.userId }
    //     })

    //     return res.render("users/ads", { products })
    // }
}