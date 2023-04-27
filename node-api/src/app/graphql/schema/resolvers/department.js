import { DepartmentModel, LocalityModel } from "../../../models/index.js";
import { GraphQLError } from "graphql";

export const department = {
  Query: {
    getLocalitiesByDepartmentId: async (_parent, { args: { id } }, context) => {
      try {
        const department = await DepartmentModel.findOne({
          where: { id: id },
          include: [{ model: LocalityModel }],
        });
        if (!department) {
          return new GraphQLError(
            "There are no localities with the departmentId " + id
          );
        }
        return department.Localities.map((locality) => locality.toJSON());
      } catch (error) {
        return new GraphQLError(error);
      }
    },
  },
};
