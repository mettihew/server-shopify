const nodemailer = require("nodemailer");
const asyncHandler = require("express-async-handler");

const sendEmail = asyncHandler(async (data, req, res) => {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.MAIL_ID,
      pass: process.env.MP,
    },
  });

  let info = await transporter.sendMail({
    from: '"hey" <abc@gmail.com>',
    to: data.to,
    text: data.text,
    subject: data.subject,
    html: data.htm,
  });

  console.log("message sent", info.messageId);

  console.log("url", nodemailer.getTestMessageUrl(info));
});

module.exports = sendEmail;
