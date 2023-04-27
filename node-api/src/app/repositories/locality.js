import { LocalityModel, PublicationModel } from "../models/index.js";

export class LocalityRepository {
  constructor() {
    this.model = LocalityModel;
  }

  async getLocalityById(id) {
    try {
      return this.model.findOne({where: {id: id}});
    } catch (e) {
      console.error(e);
      return null
    }
  }
}
