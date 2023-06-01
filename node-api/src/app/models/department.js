import { DataTypes } from "sequelize";
import { db } from "../../config/db.js";

// This model represents a department of a province
export const DepartmentModel = db.define("Department", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});
