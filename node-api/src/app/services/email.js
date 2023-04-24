import nodemailer from "nodemailer";
import {
  dynamicEmailHtmlUtils,
  dynamicPlainTextEmailUtils,
} from "../../utils/dynamicEmailTemplates.js";

const AWS_SES_HOST = process.env.AWS_SES_HOST;
const AWS_SES_SMTP_USERNAME = process.env.AWS_SES_SMTP_USERNAME;
const AWS_SES_SMTP_PASSWORD = process.env.AWS_SES_SMTP_PASSWORD;

export class EmailService {
  constructor() {
    this.from = '"TechMo Global" <info@techmo.global>';
    this.transporter = nodemailer.createTransport({
      host: AWS_SES_HOST,
      port: 587,
      secure: false,
      auth: {
        user: AWS_SES_SMTP_USERNAME,
        pass: AWS_SES_SMTP_PASSWORD,
      },
    });
  }

  async sendEmail(to, subject, text, html) {
    // send mail with defined transport object
    try {
      const mailOptions = {
        from: this.from,
        to: to,
        subject: subject,
        text: text,
        html: html,
      };

      let info = await this.transporter.sendMail(mailOptions);
      return Promise.resolve("Message sent: " + info.messageId);
    } catch (e) {
      console.error(e);
      return Promise.reject(new Error(e.message));
    }
  }

  async sendVerificationEmail(to, data) {
    try {
      const template = dynamicEmailHtmlUtils.generateVerificationEmailHtml();
      const text =
         dynamicPlainTextEmailUtils.generateVerificationEmailPlainText(data);
      data.text = text;
      const html = template(data);

      return await this.sendEmail(to, "Verifica tu cuenta", text, html);
    } catch (e) {
      console.error(e);
      return Promise.reject(new Error(e.message));
    }
  }
}
