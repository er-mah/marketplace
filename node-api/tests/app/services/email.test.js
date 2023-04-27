import nodemailer from "nodemailer";
import { EmailService } from "../../../src/app/services/index.js";
import { dynamicEmailHtmlUtils } from "../../../src/utils/dynamicEmailTemplates.js";

import HtmlValidator from "html-validator"

describe("EmailService", () => {
  let emailService, AWS_SES_HOST, AWS_SES_SMTP_USERNAME, AWS_SES_SMTP_PASSWORD;

  const from = '"Test TechMo Global" <info@techmo.global>'; // sender verified address
  //let to = "test.techmo.global@gmail.com"; // list of receivers
  let to = "test.techmo.global@gmail.com";
  let subject = "This is a test email from techmo-marketplace"; // Subject line
  let text = "Hello world"; // plain text body
  let html = `<><h1>Funciona? Yo creo que sí. Por las dudas:</h1><p>Hello world!<p></>`; // html body

  beforeAll(() => {
    AWS_SES_HOST = process.env.AWS_SES_HOST;
    AWS_SES_SMTP_USERNAME = process.env.AWS_SES_SMTP_USERNAME;
    AWS_SES_SMTP_PASSWORD = process.env.AWS_SES_SMTP_PASSWORD;

    emailService = new EmailService();
  });

  describe("sendEmail", () => {
    it("should send an email via aws SES to verified identities", async () => {
      emailService.transporter = await nodemailer.createTransport({
        host: AWS_SES_HOST,
        port: 587,
        secure: false,
        auth: {
          user: AWS_SES_SMTP_USERNAME,
          pass: AWS_SES_SMTP_PASSWORD,
        },
      });

      to = "test.techmo.global@gmail.com, info@techmo.global";

      await expect(
        emailService.sendEmail(from, to, subject, text, html)
      ).resolves.toMatch(/Message sent: <[a-f\d-]+@techmo\.global>/);
    });

    it("should throw an error if there was an error sending the email", async () => {
      // Modify the transporter to use invalid credentials or a non-existent host
      emailService.transporter = await nodemailer.createTransport({
        host: "invalid.host",
        port: 587,
        secure: false,
        auth: {
          user: "invalid-user",
          pass: "invalid-password",
        },
      });

      // Assert
      // Expect an error to be thrown when trying to send the email
      await expect(
        emailService.sendEmail(from, to, subject, text, html)
      ).rejects.toThrow();
    });
  });

  describe("sendVerificationEmail", () => {
    it("should generate a verification template", async () => {
      const context = {
        typeOfAction: "creación de cuenta",
        user: {
          first_name: "Esteban",
          last_name: "Rivas",
        },
        verificationUrl: "https://www.google.com",
      };
      const template = dynamicEmailHtmlUtils.generateVerificationEmailHtml();
      const result = template(context);

      const firstTag = result.match(/<\w+>/);
      expect(firstTag[0]).toBe("<html>");

    });
    it("should send a verification email", async () => {

      const context = {
        typeOfAction: "creación de cuenta",
        user: {
          first_name: "Esteban",
          last_name: "Rivas",
        },
        verificationUrl: "https://www.google.com",
      };

      await expect(
        emailService.sendVerificationEmail(to, context)
      ).resolves.toMatch(/Message sent: <[a-f\d-]+@techmo\.global>/);
    });
  });
});
