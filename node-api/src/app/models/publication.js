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
      allowNull: false,
    },
    vehicle_version: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    vehicle_codia_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    vehicle_state: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        customValidator: (value) => {
          const enums = ["Nuevo", "Usado"];
          if (!enums.includes(value)) {
            throw new Error("not a valid option");
          }
        },
      },
    },
    vehicle_group: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        customValidator: (value) => {
          const enums = [
            "Alta gama",
            "Ciudad",
            "Familia",
            "Todo terreno",
            "Utilitario",
            "Otro",
          ];
          if (!enums.includes(value)) {
            throw new Error("not a valid option");
          }
        },
      },
    },
    kms: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    price: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    currency: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        customValidator: (value) => {
          const enums = ["USD", "ARS"];
          if (!enums.includes(value)) {
            throw new Error("not a valid option");
          }
        },
      },
    },
    fuel: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        customValidator: (value) => {
          const enums = [
            "Diesel",
            "Nafta",
            "Nafta/Gnc",
            "Turbo Diesel",
            "Otro",
          ];
          if (!enums.includes(value)) {
            throw new Error("not a valid option");
          }
        },
      },
    },
    owner_observations: { type: DataTypes.TEXT },
    info_auto_specs: { type: DataTypes.JSON },
    photosUrls: { type: DataTypes.JSON },
    words: { type: DataTypes.TEXT },
    slug: { type: DataTypes.STRING },
  },
  {
    paranoid: true,
    timestamps: true,
  }
);
