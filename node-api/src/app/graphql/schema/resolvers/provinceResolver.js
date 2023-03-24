import { DepartmentModel, ProvinceModel } from "../../../models/index.js";
import { GraphQLError } from "graphql";

export const province = {
  Query: {
    getDepartmentsByProvinceId: async (_parent, { id }, context) => {
      if (context.user) {
        return Promise.reject(new GraphQLError(`User logged` + context.user));
      } else {
        return Promise.reject(new GraphQLError(`User not logged`));
      }
      try {
        const province = await ProvinceModel.findOne({
          where: { id: id },
          include: [{ model: DepartmentModel }],
        });
        if (!province) {
          return Promise.reject(
            new GraphQLError(
              "There are no departments with the provinceId " + id
            )
          );
        }
        return province.Departments.map((department) => department.toJSON());
      } catch (error) {
        return Promise.reject(new GraphQLError(error));
      }
    },
    getAllProvinces: async () => {
      try {
        const provinces = await ProvinceModel.findAll();
        if (!provinces) {
          return Promise.reject(
            new GraphQLError("There are no registered provinces.")
          );
        }
        return provinces.map((province) => province.toJSON());
      } catch (error) {
        return Promise.reject(new GraphQLError(error));
      }
    },
  },
};
