const nodemailer = require("nodemailer");

const sendEmail = async (mailOptions) => {
  let trasporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  let info = await trasporter.sendMail(mailOptions);

  console.log("message sent : " + info.messageId);
};
module.exports = sendEmail;
