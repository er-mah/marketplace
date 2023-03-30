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
    vehicle_group: {
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
    vehicle_codia_id: {
      type: DataTypes.INTEGER,
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
            "otro",
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
    slug: { type: DataTypes.STRING },
  },
  {
    paranoid: true,
    timestamps: true,
  }
);
