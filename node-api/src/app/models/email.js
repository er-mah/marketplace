import { DataTypes } from "sequelize";
import { db } from "../../config/db.js";

// This model represents emails sent
export const EmailModel = db.define(
  "Email",
  {
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    to: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
      validate: {
        customValidator: (value) => {
          const enums = ["ACCOUNT_VERIFICATION", "PASSWORD_RESET"];
          if (!enums.includes(value)) {
            throw new Error("not a valid option");
          }
        },
      },
      allowNull: false,
    },
    plain_text: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    html: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    error: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    response: {
      type: DataTypes.JSON,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    paranoid: true,
  }
);
