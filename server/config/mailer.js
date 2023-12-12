const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  auth: {
    user: 'patrick67@ethereal.email',
    pass: 'pD4pY9zkrg3MywQhXP'
  }
});

module.exports = transporter;
