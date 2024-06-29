const nodemailer = require("nodemailer");
const ejs = require("ejs");
const path = require("path");
const fs = require("fs").promises;

async function sendMail({ to, subject, templateName, data }) {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: true,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const templatePath = path.join(
    __dirname,
    "..",
    "..",
    "utils",
    "email",
    "templates",
    `${templateName}.ejs`
  );
  const template = await fs.readFile(templatePath, "utf-8");

  const html = ejs.render(template, data);

  const info = await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to,
    subject,
    html,
  });

  console.log("Message sent: %s", info.messageId);
  return info;
}

module.exports = sendMail;
