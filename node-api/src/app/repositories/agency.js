import {AgencyModel, UserModel} from "../models/index.js";
import { Op } from "sequelize";

export class AgencyRepository {
  constructor() {
    this.model = AgencyModel;
  }

  searchAgenciesByName(nameQuery) {
    return this.model.findAll({
      where: {
        name: { [Op.like]: `%${nameQuery}%` },
        email: { [Op.like]: `%${nameQuery}%` },
      },
    });
  }

  createAgency(name, address, email, phone, locality_id, zip_code) {
    try {
      return this.model.create({ name, address, email, phone, locality_id, zip_code });
    } catch (e) {
      console.error(e);
    }
  }

  getAgencyById(id) {
    try {
      return this.model.findOne({
        where: { id: id },
        include: [{ model: UserModel }],
      });
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
