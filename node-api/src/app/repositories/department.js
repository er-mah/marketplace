import {DepartmentModel, LocalityModel} from "../models/index.js";

export class DepartmentRepository {
  constructor() {
    this.model = DepartmentModel;
  }

  async getDepartmentById(id) {
    try {
      return this.model.findOne({
        where: { id: id },
        include: [{ model: LocalityModel }]
      });
    } catch (e) {
      console.error(e);
      return null
    }
  }
}
