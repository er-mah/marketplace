import { DataTypes } from "sequelize";
import { db } from "../../config/db.js";

// This model helps manage the different sessions user have everytime they authenticate
export const UserSessionModel = db.define(
  "user_sessions",
  {
    // Session ID
    sid: {
      primaryKey: true,
      type: DataTypes.STRING,
      allowNull: false,
    },
    // Session data
    sess: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    expire: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    tableName: "user_sessions",
    timestamps: false,
  }
);
