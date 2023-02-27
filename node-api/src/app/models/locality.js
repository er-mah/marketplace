import { db } from "../../config/db.js";

import {DataTypes} from "sequelize";

// This model represents a locality of a department
export const LocalityModel = db.define("Locality", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  latitude: DataTypes.STRING,
  longitude: DataTypes.STRING,
});