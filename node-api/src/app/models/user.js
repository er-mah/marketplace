import { DataTypes } from "sequelize";
import { db } from "../../config/db.js";
import bcrypt from "bcrypt";

import { AgencyModel, DepartmentModel, PublicationModel } from "./index.js";

// TODO: CHANGE THIS LIBRARY -> bcrypt or bcryptjs

// This model represents a user that uses the system
export const UserModel = db.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: DataTypes.STRING,
    phone: DataTypes.STRING,
    profileImage: DataTypes.STRING,
    dni: DataTypes.STRING,
    isAdmin: DataTypes.BOOLEAN,
    isAgencyRepresentative: DataTypes.BOOLEAN,
    isEmailVerified: DataTypes.BOOLEAN,
    isAccountDisabled: DataTypes.BOOLEAN,
  },
  {
    paranoid: true,
  }
);

UserModel.generateHash = (password) =>
  bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);

UserModel.prototype.validPassword = (password, userpass) =>
  bcrypt.compareSync(password, userpass);
