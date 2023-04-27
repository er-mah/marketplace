import { DepartmentModel, ProvinceModel } from "../../../models/index.js";
import { GraphQLError } from "graphql";

export const province = {
  Query: {
    getDepartmentsByProvinceId: async (_parent, { id }, { user }) => {
      if (user) {
        try {
          // TODO REFACTOR TO REPOSITORY
          const province = await ProvinceModel.findOne({
            where: { id: id },
            include: [{ model: DepartmentModel }],
          });
          if (!province) {
            return new GraphQLError(
              "There are no departments with the provinceId " + id
            );
          }
          return province.Departments.map((department) => department.toJSON());
        } catch (error) {
          return new GraphQLError(error);
        }
      } else {
        // TODO REFACTOR TO UNIQUE OBJECT THAT HANDLES THE SAME ERROR
        return new GraphQLError(
          "You must be authenticated to access this resource.",
          { extensions: { code: "AUTENTICATION_ERROR" } }
        );
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
