import { DepartmentModel, LocalityModel } from "../../../models/index.js";
import { GraphQLError } from "graphql";
import {DepartmentRepository} from "../../../repositories/index.js";


const departmentRepo = new DepartmentRepository();
export const department = {
  Query: {
    getLocalitiesByDepartmentId: async (_parent, { id }, context) => {
      try {

        const department = await departmentRepo.getDepartmentById(id)
        if (!department) {
          return new GraphQLError(
            "There are no localities with the departmentId: " + id
          );
        }
        return department.Localities.map((locality) => locality.toJSON());
      } catch (error) {
        return new GraphQLError(error);
      }
    },
  },
};
