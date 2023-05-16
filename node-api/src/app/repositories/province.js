import {DepartmentModel, ProvinceModel} from "../models/index.js";

export class ProvinceRepository {
  constructor() {
    this.model = ProvinceModel;
  }

  async getProvinceById(id) {
    try {
      return this.model.findOne({
        where: { id: id },
        include: [{ model: DepartmentModel }],
      });
    } catch (e) {
      console.error(e);
      return null;
    }
  }
}
