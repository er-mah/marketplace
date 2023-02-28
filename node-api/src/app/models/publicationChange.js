import { DataTypes } from "sequelize";
import { db } from "../../config/db.js";

// This model is an intermediate table that represents each change a publication suffers
export const PublicationChangesModel = db.define(
  "Publication Change",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    active: DataTypes.BOOLEAN,
  },
  {
    timestamps: true,
  }
);
