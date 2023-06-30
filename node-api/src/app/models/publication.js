import { DataTypes } from "sequelize";
import { db } from "../../config/db.js";

// This model represents a vehicle publication
export const PublicationModel = db.define(
  "Publication",
  {
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    vehicle_brand: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    vehicle_model: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    vehicle_year: {
      type: DataTypes.STRING,
    },
    vehicle_version: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    vehicle_state: {
      type: DataTypes.STRING,
      validate: {
        customValidator: (value) => {
          const enums = ["nuevo", "usado"];
          if (!enums.includes(value)) {
            throw new Error("not a valid option");
          }
        },
      },
    },
    vehicle_segment: {
      type: DataTypes.STRING,
      validate: {
        customValidator: (value) => {
          const enums = [
            "alta_gama",
            "ciudad",
            "familia",
            "todo_terreno",
            "utilitario",
            "otro",
          ];
          if (!enums.includes(value)) {
            throw new Error("not a valid option");
          }
        },
      },
    },
    kms: {
      type: DataTypes.FLOAT,
    },
    price: {
      type: DataTypes.STRING,
    },
    currency: {
      type: DataTypes.STRING,
      validate: {
        customValidator: (value) => {
          const enums = ["usd", "ars"];
          if (!enums.includes(value)) {
            throw new Error("not a valid option");
          }
        },
      },
    },
    fuel: {
      type: DataTypes.STRING,
      validate: {
        customValidator: (value) => {
          const enums = [
            "diesel",
            "nafta",
            "nafta_gnc",
            "turbo_diesel",
              "hibrido",
              "electrico",
            "otro",
          ];
          if (!enums.includes(value)) {
            throw new Error("not a valid option");
          }
        },
      },
    },
    description: { type: DataTypes.TEXT },
    photos_urls: { type: DataTypes.JSON },
    slug: { type: DataTypes.STRING, unique: true },
  },
  {
    paranoid: true,
    timestamps: true,
  }
);
