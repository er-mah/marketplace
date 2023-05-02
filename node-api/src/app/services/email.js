import nodemailer from "nodemailer";
import {
  dynamicEmailHtmlUtils,
  dynamicPlainTextEmailUtils,
} from "../../utils/dynamicEmailTemplates.js";
import { EmailRepository } from "../repositories/index.js";

const AWS_SES_HOST = process.env.AWS_SES_HOST;
const AWS_SES_SMTP_USERNAME = process.env.AWS_SES_SMTP_USERNAME;
const AWS_SES_SMTP_PASSWORD = process.env.AWS_SES_SMTP_PASSWORD;

const emailRepo = new EmailRepository();

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

  async sendEmail(to, type, subject, text, html) {
    // send mail with defined transport object
    try {
      const mailOptions = {
        from: this.from,
        to: to,
        subject: subject,
        text: text,
        html: html,
      };

      let info = await this.transporter
        .sendMail(mailOptions)
        .then(async (response) => {
          await emailRepo.createEmailRecord(
            to,
            type,
            text,
            html,
            false,
            JSON.stringify(response)
          );
          return response;
        })
        .catch(async (error) => {
          await emailRepo.createEmailRecord(
            to,
            type,
            text,
            html,
            true,
            JSON.stringify(error)
          );

        });
      if (!info) {
        return Promise.resolve("Message not sent.");
      }
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

      return await this.sendEmail(
          to,
          "ACCOUNT_VERIFICATION",
          "Verifica tu cuenta",
          text,
          html
      );
    } catch (e) {
      console.error(e);
      return Promise.reject(new Error(e.message));
    }
  }

  async sendAccountRecoveryEmail(to, data) {
    try {
      const template = dynamicEmailHtmlUtils.generateAccountRecoveryEmailHtml();
      const text =
          dynamicPlainTextEmailUtils.generatedAccountRecoveryEmail(data);
      data.text = text;
      const html = template(data);

      return await this.sendEmail(
          to,
          "PASSWORD_RESET",
          "Recupera tu contraseña",
          text,
          html
      );
    } catch (e) {
      console.error(e);
      return Promise.reject(new Error(e.message));
    }
  }
}
