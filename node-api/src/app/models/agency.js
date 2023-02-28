import { DataTypes } from "sequelize";
import { db } from "../../config/db.js";

// This model represents an agency profile
export const AgencyModel = db.define(
  "Agency",
  {
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    agency_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    agency_address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    agency_email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    agency_phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    banner_image: DataTypes.STRING,
  },
  {
    timestamps: true,
    paranoid: true,
  }
);
