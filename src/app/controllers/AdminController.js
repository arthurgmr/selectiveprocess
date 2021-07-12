const { hash } = require("bcryptjs");
const puppeteer = require("puppeteer");

const Configs = require("../models/Configs");
const User = require("../models/User");
const Colleges = require("../models/Colleges");
const Courses = require("../models/Courses");
const ClassificationRegular = require("../models/ClassificationRegular")
const ClassificationSpecial = require("../models/ClassificationSpecial")

const LoadUserServices = require("../services/LoadUserServices");
const { date, formatCpf, formatCep, formatPhone } = require("../../lib/utils");

module.exports = {
  async index(req, res) {
    try {
      const users = await User.findAll();
      const totalUsers = users.length;

      return res.render("admin/index", { totalUsers });
    } catch (err) {
      console.log(err);
    }
  },

  //controllers search
  async indexSearch(req, res) {
    return res.render("admin/index-search");
  },
  async search(req, res) {
    try {
      let { filter } = req.query;

      filter = filter.replace(/[.,]/g, "");

      if (!filter || filter.toLowerCase() == "todos candidatos") filter = null;

      let users = await User.search({ filter });

      const usersPromise = users.map(LoadUserServices.formatDate);

      users = await Promise.all(usersPromise);

      const search = {
        term: filter || "Todos Candidatos",
        total: users.length,
      };

      return res.render("admin/search", { users, search });
    } catch (err) {
      console.log(err);
    }
  },

  //controllers to edit and delete users;
  async showUser(req, res) {
    const { id } = req.params;

    const colleges = await Colleges.findAll();
    const courses = await Courses.findAll();

    const user = await LoadUserServices.load("userDataComplete", id);

    return res.render("users/edit", { user, colleges, courses });
  },
  async putUser(req, res) {
    try {
      const { user } = req;
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
      cpf = cpf.replace(/\D/g, "");
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

      return res.render("admin/index-search", {
        success: "Dados Atualizados com Sucesso",
      });
    } catch (err) {
      console.log(err);
      return res.render("admin/index-search", {
        error: "Algum erro aconteceu, contacte o administrador.",
      });
    }
  },
  async deleteUser(req, res) {
    const { id } = req.body;

    await User.delete(id);

    return res.render("admin/index-search", {
      success: "Cadastro deletado com Sucesso.",
    });
  },


  //choose classification
  chooseClassification(req, res) {
    try {
      return res.render("admin/choose-classif.njk");
    } catch (err) {
      console.log(err);
    }    
  },
  //controller to partial classification regular
  async showClassificationRegular(req, res) {
    //save users in the array already ordered;
    const ordenedUsers = await User.classificationRegular();
    //make map in users saving classification in column partialClassf
    const classifiedUsers = ordenedUsers.map((user) => {
      const position = ordenedUsers.indexOf(user) + 1;
      const { format } = date(Number(user.birth_date))

      user.cpf = formatCpf(user.cpf)
      user.cep = formatCep(user.cep)
      user.phone1 = formatPhone(user.phone1)
      user.phone2 = formatPhone(user.phone2)
      user.birth_date = format
      user.deficient = user.deficient == 0 ? 'Não' : 'Sim';
      user.specialization_regular = user.specialization_regular == 0 ? 'Não' : 'Sim';
      user.specialization_special = user.specialization_special == 0 ? 'Não' : 'Sim';

      return {
        ...user,
        position,
      };
    });

    return res.render("admin/partial-classif", { classifiedUsers });
  },
  //generate classification regular
  async generateClassifRegular(req, res) {
        //save users in the array already ordered;
        const ordenedUsers = await User.classificationRegular();

        //delete all registers in classification;
        await ClassificationRegular.deleteAll();

        //make map in users saving classification in column partialClassf
        const classifiedUsersPromise = ordenedUsers.map((user) => {
          const position = ordenedUsers.indexOf(user) + 1;
          const { format } = date(Number(user.birth_date))
    
          user.cpf = formatCpf(user.cpf)
          user.cep = formatCep(user.cep)
          user.phone1 = formatPhone(user.phone1)
          user.phone2 = formatPhone(user.phone2)
          user.birth_date = format
          user.deficient = user.deficient == 0 ? 'Não' : 'Sim';
          user.specialization_regular = user.specialization_regular == 0 ? 'Não' : 'Sim';
          user.specialization_special = user.specialization_special == 0 ? 'Não' : 'Sim';

          ClassificationRegular.create({
            position,
            course_name: user.course_name,
            name: user.name,
            birth_date: user.birth_date,
            deficient: user.deficient,
            specialization_regular: user.specialization_regular,
            period_course: user.period_course,
            college_name: user.college_name,
          })
    
          return {
            ...user,
            position,
          };
        });

          const classifiedUsers = await Promise.all(classifiedUsersPromise);

          return res.render("admin/partial-classif", { 
            classifiedUsers,
            success: "Classificação Gerada com Sucesso, em breve você receberá um e-mail contendo o arquivo em Excel!"
           }); 

        
  },
  //print classification
  async printClfRegular(req, res) {
    const classifiedUsers = await ClassificationRegular.findAll();

    if(!classifiedUsers) {
      return res.render("admin/print-classif", {
        error: "Gera a classificação primeiro para depois realizar a impressão."
      })
    }
     return res.render("admin/print-classif", classifiedUsers);
  },

  //controller to partial classification special
  async showClassificationSpecial(req, res) {
    //save users in the array already ordered;
    const ordenedUsers = await User.classificationSpecial();
    //make map in users saving position in column partialClassf
    const classifiedUsersSpecial = ordenedUsers.map((user) => {
      const position = ordenedUsers.indexOf(user) + 1;
      const { format } = date(Number(user.birth_date))

      user.cpf = formatCpf(user.cpf)
      user.cep = formatCep(user.cep)
      user.phone1 = formatPhone(user.phone1)
      user.phone2 = formatPhone(user.phone2)
      user.birth_date = format
      user.deficient = user.deficient == 0 ? 'Não' : 'Sim';
      user.specialization_regular = user.specialization_regular == 0 ? 'Não' : 'Sim';
      user.specialization_special = user.specialization_special == 0 ? 'Não' : 'Sim';

      return {
        ...user,
        position,
      };
    });

    return res.render("admin/partial-classif", { classifiedUsersSpecial });
  },

  //controlers configs
  async configs(req, res) {
    try {
      const config = await Configs.findOne();

      if(config) {
        config.date_edict = date(Number(config.date_edict)).iso;
        config.inicial_date = date(Number(config.inicial_date)).iso;
        config.final_date = date(Number(config.final_date)).iso;
      }
      return res.render("admin/configs", { config });
      
    } catch (err) {
      console.log(err);
      return res.render("admin/configs", {
        error: "Algum erro aconteceu, contacte o administrador.",
      });
    }
  },
  async configsCreateAndEdit(req, res) {
    try {
      const config = await Configs.findOne();

      if (config) {
        let = {
          process_name,
          edict_number,
          date_edict,
          inicial_date,
          final_date,
          declaration,
          warnings,
        } = req.body;

        date_edict = Date.parse(date_edict);
        inicial_date = Date.parse(inicial_date);
        final_date = Date.parse(final_date);

        await Configs.update(config.id, {
          process_name,
          edict_number,
          date_edict,
          inicial_date,
          final_date,
          declaration,
          warnings,
        });

        return res.render("admin/configs", {
          config: await Configs.findOne(),
          success: "Configurações Atualizadas",
        });
      } else {
        let = {
          process_name,
          edict_number,
          date_edict,
          inicial_date,
          final_date,
          declaration,
          warnings,
        } = req.body;

        date_edict = Date.parse(date_edict);
        inicial_date = Date.parse(inicial_date);
        final_date = Date.parse(final_date);

        await Configs.create({
          process_name,
          edict_number,
          date_edict,
          inicial_date,
          final_date,
          declaration,
          warnings,
        });

        return res.render("admin/configs", {
          config: await Configs.findOne(),
          success: "Configurações Salvas",
        });
      }
    } catch (err) {
      console.log(err);
      return res.render("admin/configs", {
        error: "Algum erro aconteceu, contacte o administrador.",
      });
    }
  },
  async configsDelete(req, res) {
    try {
      const { configId } = req.body;

      await Configs.delete(configId);

      return res.render("admin/configs", {
        success: "Configurações Deletadas",
      });
    } catch (err) {
      console.log(err);
      return res.render("admin/configs", {
        error: "Algum erro aconteceu, contacte o administrador.",
      });
    }
  },
};
