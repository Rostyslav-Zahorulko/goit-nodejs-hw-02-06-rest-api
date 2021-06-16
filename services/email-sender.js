const sgMail = require("@sendgrid/mail");
const { email } = require("../config/config");
require("dotenv").config();

class SendgridSender {
  async send(message) {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    return await sgMail.send({ ...message, from: email.sendgrid });
  }
}

module.exports = {
  SendgridSender,
};
