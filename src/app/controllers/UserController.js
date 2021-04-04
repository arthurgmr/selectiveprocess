const { hash} = require('bcryptjs')
const puppeteer = require('puppeteer')

const User = require('../models/User')
const Colleges = require('../models/Colleges')
const Courses = require('../models/Courses')

const LoadUserServices = require('../services/LoadUserServices')
const { getFirstName } = require('../../lib/utils')




module.exports = {
    async registerForm(req, res) {
        const colleges = await Colleges.findAll()
        const courses = await Courses.findAll()

        return res.render("users/register", { colleges, courses })
    },
    async post (req, res) {
        try {
            let {
                name,
                cpf,
                birth_date,
                deficient,
                cep,
                address,
                address_number,
                address_complement,
                address_district,
                course_id,
                college_id,
                period_course,
                specialization,
                email,
                phone1,
                phone2,
                password
            } = req.body

            birth_date = Date.parse(birth_date);
            password = await hash(password, 8);
            cpf = cpf.replace(/\D/g, "");
            cep = cep.replace(/\D/g, "");
            phone1 = phone1.replace(/\D/g, "");
            phone2 = phone2.replace(/\D/g, "");

            const userId = await User.create({
                name,
                cpf,
                birth_date,
                deficient,
                cep,
                address,
                address_number,
                address_complement,
                address_district,
                course_id,
                college_id,
                period_course,
                specialization,
                email,
                phone1,
                phone2,
                password
            })
            
            return res.render('users/success')

        }catch(err) {
            console.log(err)
        }

    },
    async index(req, res) {
        try {
            const { user } = req

            const firstNameUser = getFirstName(user.name)

            return res.render('users/index', { user, firstNameUser })
        } catch (err) {
            console.log(err)
        }
    },
    async printForm(req, res) {
        try {
            const { id } = req.params

            const colleges = await Colleges.findAll()
            const courses = await Courses.findAll()

            const user = await LoadUserServices.load('userDataComplete', id)
         
            return res.render('users/print-form', { user, colleges, courses })

        }catch(err) {
            console.log(err)
        }
    },
    async formPdf(req, res) {
        const { id } = req.params
        const user = await LoadUserServices.load('userDataComplete', id)

        const browser = await puppeteer.launch()
        const page = await browser.newPage({headless: false})

        await page.goto(`http://localhost:3000/session/login`, { waitUntil: 'networkidle0'})
        await page.type('input[type="email"]', user.email)
        await page.type('input[type="password"]', '123')
        await page.click('button[type="submit"]')
        await page.waitForNavigation()
        await page.goto(`http://localhost:3000/users/print-form/${id}`, { waitUntil: 'networkidle0'})
        const cookies = await page.cookies(`http://localhost:3000/users/print-form/${id}`)
        await page.deleteCookie(...cookies)

        const pdf = await page.pdf({
            printBackground: true,
            format: 'Letter'
        })

        await browser.close()

        res.contentType('application/pdf')

        return res.send(pdf)

    },
    async edit(req, res) {
        try {
            const { userId: id } = req.session

            const colleges = await Colleges.findAll()
            const courses = await Courses.findAll()

            const user = await LoadUserServices.load('userDataComplete', id)
         
            return res.render('users/edit', { user, colleges, courses })

        }catch(err) {
            console.log(err)
        }
    },
    async put(req, res ){
        try {
            const { user } = req
            let {                
                name,
                cpf,
                birth_date,
                cep,
                address,
                address_number,
                address_complement,
                address_district,
                course_id,
                college_id,
                period_course,
                specialization,
                email,
                phone1,
                phone2 } = req.body

                birth_date = Date.parse(birth_date);
                cpf = cpf.replace(/\D/g, "")
                cep = cep.replace(/\D/g, "");
                phone1 = phone1.replace(/\D/g, "");
                phone2 = phone2.replace(/\D/g, "");

            await User.update(user.id, {
                name,
                cpf,
                birth_date,
                cep,
                address,
                address_number,
                address_complement,
                address_district,
                course_id,
                college_id,
                period_course,
                specialization,
                email,
                phone1,
                phone2
            })

            return res.render("users/edit", {
                user: req.body,
                success: "Dados Atualizados com Sucesso"
            })

        }catch(err) {
            console.log(err)
            return res.render("users/index", {
                error: "Algum erro aconteceu"
            })
        }
    },
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