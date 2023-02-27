import { DataTypes } from "sequelize";
import { db } from "../../config/db.js";


import { UserModel } from "./index.js";

// This model represents an agency profile
export const AgencyModel = db.define(
  "Agency",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    agencyName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    agencyAddress: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    agencyEmail: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    agencyPhone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    bannerImage: DataTypes.STRING,
  },
  {
    paranoid: true,
  }
);
