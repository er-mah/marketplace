import { AgencyModel } from "../models/index.js";

export class AgencyRepository {
  constructor() {
    this.model = AgencyModel;
  }

  createAgency(name, address, email, phone, locality_id) {
    try {
      return this.model.create({ name, address, email, phone, locality_id });
    } catch (e) {
      console.error(e);
    }
  }

  getAgencyById(id) {
    try {
      return this.model.findOne({ where: { id: id } });
    } catch (e) {
      console.error(e);
    }
  }

  getAgencyByEmail(id) {
    try {
      return this.model.findOne({ where: { email: id } });
    } catch (e) {
      console.error(e);
    }
  }
}
