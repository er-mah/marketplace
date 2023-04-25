import { DataTypes } from "sequelize";
import { db } from "../../config/db.js";
import bcrypt from "bcrypt";

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
    is_email_verified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    verification_token: {
      type: DataTypes.STRING,
    },
    address: DataTypes.STRING,
    phone: DataTypes.STRING,
    profile_image: DataTypes.STRING,
    dni: DataTypes.STRING,
    is_admin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    is_agency_representative: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    has_provided_additional_data: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    is_account_disabled: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    timestamps: true,
    paranoid: true,
  }
);
