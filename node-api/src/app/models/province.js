import { DataTypes } from "sequelize";
import { db } from "../../config/db.js";

// This model represents a province of Argentina
export const ProvinceModel = db.define("Province", {
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
