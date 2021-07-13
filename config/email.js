const nodemailer = require('nodemailer');
const path = require('path');
require('dotenv').config();

const environment = process.env;

module.exports.GmailTransport = nodemailer.createTransport({
  service: environment.GMAIL_SERVICE_NAME,
  host: environment.GMAIL_SERVICE_HOST,
  secure: environment.GMAIL_SERVICE_SECURE,
  port: environment.GMAIL_SERVICE_PORT,
  auth: {
    user: environment.GMAIL_USER_NAME,
    pass: environment.GMAIL_USER_PASSWORD,
  },
});

const handlebarOptions = {
  viewEngine: {
    extName: '.handlebars',
    partialsDir: path.resolve('views/email/'),
    defaultLayout: false,
  },
  viewPath: path.resolve('views/email/'),
  extName: '.handlebars',
};

module.exports.ViewOption = (transport, hbs) => {
  transport.use('compile', hbs(handlebarOptions));
};
