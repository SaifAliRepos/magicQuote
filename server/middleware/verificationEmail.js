const nodemailer = require("nodemailer");
const transporter = require("../config/mailer");

const sendVerificationEmail = async (email) => {
  const random5Digits = Math.floor(Math.random() * 90000) + 10000;

  let message = {
    from: 'sender@example.com',
    to: email,
    subject: 'Account Verification',
    text: 'Greetings,',
    html: `<p><b>Hello this is your verification code </b>${random5Digits}</p>`
  };

  transporter.sendMail(message, (err, info) => {
    if (err) {
      console.log('Error occurred. ' + err.message);
      return process.exit(1);
    }
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  });
  return random5Digits;
}

module.exports = sendVerificationEmail
