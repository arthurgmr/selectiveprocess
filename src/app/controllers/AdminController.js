const { hash} = require('bcryptjs')
const puppeteer = require('puppeteer')

const Configs = require('../models/Configs')
const User = require('../models/User')
const Colleges = require('../models/Colleges')
const Courses = require('../models/Courses')

const LoadUserServices = require('../services/LoadUserServices')
const { getFirstName } = require('../../lib/utils')




module.exports = {
    // async registerForm(req, res) {
    //     const colleges = await Colleges.findAll()
    //     const courses = await Courses.findAll()

    //     return res.render("users/register", { colleges, courses })
    // },
    // async post (req, res) {
    //     try {
    //         let {
    //             name,
    //             cpf,
    //             birth_date,
    //             deficient,
    //             cep,
    //             address,
    //             address_number,
    //             address_complement,
    //             address_district,
    //             course_id,
    //             college_id,
    //             period_course,
    //             specialization,
    //             email,
    //             phone1,
    //             phone2,
    //             password
    //         } = req.body

    //         birth_date = Date.parse(birth_date);
    //         password = await hash(password, 8);
    //         cpf = cpf.replace(/\D/g, "");
    //         cep = cep.replace(/\D/g, "");
    //         phone1 = phone1.replace(/\D/g, "");
    //         phone2 = phone2.replace(/\D/g, "");

    //         const userId = await User.create({
    //             name,
    //             cpf,
    //             birth_date,
    //             deficient,
    //             cep,
    //             address,
    //             address_number,
    //             address_complement,
    //             address_district,
    //             course_id,
    //             college_id,
    //             period_course,
    //             specialization,
    //             email,
    //             phone1,
    //             phone2,
    //             password
    //         })
            
    //         return res.render('users/success')

    //     }catch(err) {
    //         console.log(err)
    //     }

    // },
    async index(req, res) {
        try {
            //make logic to show subscripters number;
            
            return res.render('admin/index')
        } catch (err) {
            console.log(err)
        }
    },

    //route configs
    async configs(req, res) {
        try {

            const config = await Configs.findOne()
            
            return res.render('admin/configs', { config })
  

        } catch (err) {
            console.log(err)
            return res.render('admin/configs', {
                error: "Algum erro aconteceu, contacte o administrador."
            })
        }
    },
    async configsCreateAndEdit(req, res) {
        try {

            const config = await Configs.findOne()

            if(config) {

                let = {
                    process_name, 
                    edict_number, 
                    date_edict, 
                    inicial_date, 
                    final_date, 
                    declaration, 
                    warnings,
                } = req.body
        
                await Configs.update(config.id, {
                    process_name, 
                    edict_number, 
                    date_edict, 
                    inicial_date, 
                    final_date, 
                    declaration, 
                    warnings,
                })
        
                return res.render('admin/configs', { 
                    config: await Configs.findOne(),
                    success: "Configurações Atualizadas" 
                })

            } else {

                let = {
                    process_name, 
                    edict_number, 
                    date_edict, 
                    inicial_date, 
                    final_date, 
                    declaration, 
                    warnings,
                } = req.body
    
                await Configs.create({
                    process_name, 
                    edict_number, 
                    date_edict, 
                    inicial_date, 
                    final_date, 
                    declaration, 
                    warnings,
                })
    
                return res.render('admin/configs', { 
                    config: await Configs.findOne(),
                    success: "Configurações Salvas" 
                })
            }

        } catch (err) {
            console.log(err)
            return res.render('admin/configs', {
                error: "Algum erro aconteceu, contacte o administrador."
            })
        }
    },
    async configsDelete(req, res) {
        try {
            const { configId } = req.body
            
            await Configs.delete(configId)

            return res.render('admin/configs', { 
                success: "Configurações Deletadas"    
            })

        } catch (err) {
            console.log(err)
            return res.render('admin/configs', {
                error: "Algum erro aconteceu, contacte o administrador."
            })
            
        }
    }
}