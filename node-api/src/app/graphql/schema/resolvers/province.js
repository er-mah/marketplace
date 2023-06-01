import { ProvinceModel } from "../../../models/index.js";
import { GraphQLError } from "graphql";
import { ProvinceRepository } from "../../../repositories/index.js";

const provinceRepo = new ProvinceRepository();
export const province = {
  Query: {
    getDepartmentsByProvinceId: async (_parent, { id }) => {
      try {
        const province = await provinceRepo.getProvinceById(id);
        if (!province) {
          return new GraphQLError(
            "There are no localities with the provinceId: " + id
          );
        }
        return province.Departments.map((department) => department.toJSON());
      } catch (error) {
        return new GraphQLError(error);
      }
    },
    getAllProvinces: async () => {
      try {
        const provinces = await ProvinceModel.findAll();
        if (!provinces) {
          return new GraphQLError("There are no registered provinces.");
        }
        return provinces.map((province) => province.toJSON());
      } catch (error) {
        return new GraphQLError(error);
      }
    },
  },
};
