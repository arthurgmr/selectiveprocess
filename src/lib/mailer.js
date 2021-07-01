const nodemailer = require('nodemailer')

const transport = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "estagio@edu.muriae.mg.gov.br",
    pass: "@estagio2021"
  },
  tls: { rejectUnauthorized: false }
});

  module.exports = transport


 
//    host: "mail.digiescola.com.br",
//    port: 25,
//    secure: false,
//   auth: {
//      user: "mail@digiescola.com.br",
//      pass: "0s3xrL@9"
//    },
//    tls: { rejectUnauthorized: false }
 