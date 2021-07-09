const { hash} = require('bcryptjs')
const crypto = require('crypto')
const mailer = require("../../lib/mailer");
const puppeteer = require('puppeteer')

const User = require('../models/User')
const Colleges = require('../models/Colleges')
const Courses = require('../models/Courses')
const Configs = require('../models/Configs')

const LoadUserServices = require('../services/LoadUserServices')
const { getFirstName, date} = require('../../lib/utils')

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
                funcs,
                period_course,
                specialization_regular,
                specialization_special,
                email,
                phone1,
                phone2,
                password
            } = req.body

            name = name.toUpperCase();
            address = address.toUpperCase();
            address_complement.toUpperCase();
            address_district = address_district.toUpperCase();
            cpf = cpf.replace(/\D/g, "");
            birth_date = Date.parse(birth_date);
            cep = cep.replace(/\D/g, "");
            email = email.toLowerCase();
            specialization_regular = specialization_regular.replace(",", "");
            specialization_special = specialization_special.replace(",", "");
            phone1 = phone1.replace(/\D/g, "");
            phone2 = phone2.replace(/\D/g, "");
            password = await hash(password, 8);

            await User.create({
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
                funcs,
                specialization_regular,
                specialization_special,
                email,
                phone1,
                phone2,
                password
            })

            // send email with recover link
            const APP_URL =  process.env.APP_URL;

            let config = await Configs.findOne()
            config.date_edict = date(Number(config.date_edict)).year

            const mailOptions = {
                from: 'Estágio Educação<estagio@edu.muriae.mg.gov.br>',
                to: email,
                subject: "Confirmação da Inscrição | Processo Seletivo Estágio",
                html: `<h2>Recebemos sua Inscrição!</h2>
                        <p>Olá ${name}!</p>
                        <p>Esse e-mail confirma seu ingresso no Processo Seletivo do Estágio - Edital nº ${config.edict_number}/${config.date_edict}</p>
                        <p>
                            <a href="${APP_URL}/session/login" target="_blank">
                                Clique aqui
                            </a>
                                e acesse com suas credencias para <strong>imprimir a Ficha de Inscrição.</strong>
                        </p>
                        <p><strong>A Ficha de Inscrição é impressindível no momento da Convocação.</strong></p>
                        <p>Estamos a disposição para qualquer dúvudas.</p>
                        <p> 
                            Att, </br>
                            Estágio Educação - SME Muriaé/MG </br>
                            32 3696-3376
                        </p>
                        `,
            }

            await mailer.sendMail(mailOptions, function(error, info) {
                if(error) {
                console.log(error)
                } else {
                console.log('Email enviado: ' + info.response)
                }
            });


            
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
            const { userId: id } = req.session

            // create token to user
            const token =  crypto.randomBytes(20).toString("hex")
            
            // create expire token
            // let now = new Date()
            // now = now.setHours(now.getHours() + 1)

            await User.update(id, {
                reset_token: token,
                // reset_token_expires: now
            })
         
            return res.redirect(`/users/print-form/pdf?tk=${token}`)

        }catch(err) {
            console.log(err)
        }
    },
    async formPdf(req, res) {
        const { userId: id } = req.session

        const { tk: token } = req.query

        const APP_URL =  process.env.APP_URL;

        const browser = await puppeteer.launch({headless: true})
        const page = await browser.newPage()

        await page.goto(`${APP_URL}users/format-pdf?tk=${token}`, { waitUntil: 'networkidle0'})

        const pdf = await page.pdf({
            printBackground: true,
            format: 'Letter'
        })

        await browser.close()

        //update user
        await User.update(id, {
            reset_token: "",
            reset_token_expires: ""
        })

        res.contentType('application/pdf')

        return res.send(pdf)

    },
    async formatPdf (req, res) {
        let { user } = req

        let dateNow = new Date()
        dateNow = Date.parse(dateNow)
        dateNow = date(dateNow).format

        user = await LoadUserServices.load('userDataComplete', user.id)
        user.birth_date = date(user.birth_date).format

        let config = await Configs.findOne()
        config.date_edict = date(Number(config.date_edict)).year

        return res.render('users/print-form', { user, dateNow, config})

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
                funcs,
                period_course,
                specialization_regular,
                specialization_special,
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
                funcs,
                period_course,
                specialization_regular,
                specialization_special,
                email,
                phone1,
                phone2
            })

            const colleges = await Colleges.findAll()
            const courses = await Courses.findAll()

            return res.render("users/edit", {
                user: req.body,
                colleges,
                courses,
                success: "Dados Atualizados com Sucesso"
            })

        }catch(err) {
            console.log(err)
            return res.render("users/index", {
                error: "Algum erro aconteceu"
            })
        }
    }
}