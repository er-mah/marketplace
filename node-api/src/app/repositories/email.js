import { EmailModel } from "../models/index.js";

export class EmailRepository {
  constructor() {
    this.model = EmailModel;
  }

  createEmailRecord(to, type, plain_text, html, error, response) {
    try {
      return this.model.create({ to, type, plain_text, html, error, response });
    } catch (e) {
      console.error(e);
    }
  }
}
