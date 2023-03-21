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
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    hooks: {
      beforeCreate: async (attributes, options) => {
        if (attributes.active) {
          // If active is true, update the other registers
          await PublicationChangesModel.update(
            { active: false },
            { where: { active: true } }
          );
        }
      },
    },
    timestamps: true,
  }
);
