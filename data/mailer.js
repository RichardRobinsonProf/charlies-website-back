const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.USER_SMTP,
      pass: process.env.PASS_SMTP
    }
  })

  transporter.verify().then(() => {
    console.log('Ready for sending emails')
  })

  module.exports = {transporter}