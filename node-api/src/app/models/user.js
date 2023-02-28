import { DataTypes } from "sequelize";
import { db } from "../../config/db.js";
import bcrypt from "bcrypt";

// TODO: CHANGE THIS LIBRARY -> bcrypt or bcryptjs

// This model represents a user that uses the system
export const UserModel = db.define(
  "User",
  {
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
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
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: DataTypes.STRING,
    phone: DataTypes.STRING,
    profile_image: DataTypes.STRING,
    dni: DataTypes.STRING,
    is_admin: DataTypes.BOOLEAN,
    is_agency_representative: DataTypes.BOOLEAN,
    is_email_verified: DataTypes.BOOLEAN,
    is_account_disabled: DataTypes.BOOLEAN,
  },
  {
    timestamps: true,
    paranoid: true,
  }
);

UserModel.generateHash = (password) =>
  bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);

UserModel.prototype.validPassword = (password, userpass) =>
  bcrypt.compareSync(password, userpass);
