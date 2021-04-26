const User = require("../models/User");

const crypto = require("crypto");
const mailer = require("../../lib/mailer");
const { hash } = require("bcryptjs");

module.exports = {
  loginForm(req, res) {
    try {
      return res.render("session/login");
    } catch (err) {
      console.log(err);
    }
  },
  login(req, res) {
    // put user in req.session
    const { user, userAdmin } = req;
    if (user) {
      req.session.userId = user.id;
      return res.redirect("/users");
    } else {
      req.session.userIdAdmin = userAdmin.id;
      return res.redirect("/admin");
    }
  },
  logout(req, res) {
    req.session.destroy();
    return res.redirect("/");
  },
  forgotForm(req, res) {
    return res.render("session/forgot-password");
  },
  async forgot(req, res) {
    const user = req.user;

    try {
      // create token to user
      const token = crypto.randomBytes(20).toString("hex");

      // create expire token
      let now = new Date();
      now = now.setHours(now.getHours() + 1);

      await User.update(user.id, {
        reset_token: token,
        reset_token_expires: now,
      });

      // send email with recover link
      await mailer.sendMail({
        to: user.email,
        from: "no-reply@edu.muriae.mg.gov.br",
        subject: "Recuperar Senha | Processo Seletico Estágio",
        html: `<h2>Você perdeu sua senha?</h2>
                <p>Não se preocupe, clique no link abaixo para criar uma nova senha</p>
                <p>
                    <a href="http://localhost:3000/session/password-reset?token=${token}" target="_blank">
                        RECUPERAR SENHA
                    </a>
                </p>
                <p>
                Estamos a disposição para qualquer dúvudas </br></br>
                Atenciosamente, </br>
                Secretaria Municipal de Educação - Muriaé/MG
                </p>
                `,
      });

      // notify user
      return res.render("session/forgot-password", {
        success: "Verifique seu e-mail para criar uma nova senha",
      });
    } catch (err) {
      console.log(err);
      return res.render("session/forgot-password", {
        error: "Algum erro aconteceu, contacte o administrador.",
      });
    }
  },
  resetForm(req, res) {
    return res.render("session/password-reset", { token: req.query.token });
  },
  async reset(req, res) {
    const user = req.user;
    const { password, token } = req.body;

    try {
      //create new hash of password
      const newPassword = await hash(password, 8);

      //update user
      await User.update(user.id, {
        password: newPassword,
        reset_token: "",
        reset_token_expires: "",
      });

      //notify user about new password
      return res.render("session/login", {
        user: req.body,
        success: "Senha atualizada com sucesso",
      });
    } catch (err) {
      console.log(err);
      return res.render("session/password-reset", {
        user: req.body,
        token,
        error: "Algum erro aconteceu, contacte o administrador.",
      });
    }
  },
};
