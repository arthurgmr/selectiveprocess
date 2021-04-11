const { hash} = require('bcryptjs')
const puppeteer = require('puppeteer')

const Configs = require('../models/Configs')
const User = require('../models/User')
const Colleges = require('../models/Colleges')
const Courses = require('../models/Courses')

const LoadUserServices = require('../services/LoadUserServices')
const { getFirstName, date } = require('../../lib/utils')




module.exports = {

    async index(req, res) {
        try {
            //make logic to show subscripters number;
            
            return res.render('admin/index')
        } catch (err) {
            console.log(err)
        }
    },
    //controllers search
    async indexSearch(req, res) {
        return res.render('admin/index-search')
    },
    async search(req, res) {

        try {

            let { filter } = req.query

            filter = filter.replace(/[.,\s]/g, "")

            if(!filter || filter.toLowerCase() == 'todos candidatos') filter = null
    
            let users = await User.search({filter})
    
            const usersPromise = users.map(LoadUserServices.formatDate)
    
            users = await Promise.all(usersPromise)
    
            const search = {
                term: filter || 'Todos Candidatos',
                total: users.length
            }
    
            return res.render('admin/search', { users, search })

        } catch (err) {
            console.log(err)
        }
    },

    //controlers configs
    async configs(req, res) {
        try {

            const config = await Configs.findOne()

            config.date_edict = date(Number(config.date_edict)).iso
            config.inicial_date = date(Number(config.inicial_date)).iso
            config.final_date = date(Number(config.final_date)).iso
            
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

                date_edict = Date.parse(date_edict)
                inicial_date = Date.parse(inicial_date)
                final_date = Date.parse(final_date)
        
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

                date_edict = Date.parse(date_edict)
                inicial_date = Date.parse(inicial_date)
                final_date = Date.parse(final_date)
    
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