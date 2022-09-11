const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: ' ',
      pass: ' '
    }
  })

  transporter.verify().then(() => {
    console.log('Ready for send emails')
  })

  module.exports = {transporter}