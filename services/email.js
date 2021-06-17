const Mailgen = require("mailgen");

class EmailService {
  constructor(env, sender) {
    this.sender = sender;
    this.company = "Contacts System";

    switch (env) {
      case "development":
        this.link = "http://localhost:3000";
        break;

      case "production":
        this.link = "Link for production";
        break;

      default:
        this.link = "http://localhost:3000";
        break;
    }
  }

  #createVerificationEmailTemplate(token) {
    const mailGenerator = new Mailgen({
      theme: "cerberus",
      product: {
        name: this.company,
        link: this.link,
      },
    });

    const email = {
      body: {
        name: "Fellow",
        intro: `Welcome to ${this.company}! We're very excited to have you on board.`,
        action: {
          instructions: `To get started with ${this.company}, please click here:`,
          button: {
            color: "#22BC66",
            text: "Confirm your email",
            link: `${this.link}/api/users/verify/${token}`,
          },
        },
        outro:
          "Need help, or have questions? Just reply to this email, we'd love to help.",
      },
    };

    return mailGenerator.generate(email);
  }

  async sendVerificationEmail(token, email) {
    const emailBody = this.#createVerificationEmailTemplate(token);
    const result = await this.sender.send({
      to: email,
      subject: "Verify your email",
      html: emailBody,
    });

    console.log(result);
  }
}

module.exports = EmailService;
