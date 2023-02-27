import { DataTypes } from "sequelize";
import { db } from "../../config/db.js";

import {
  ConversationThreadModel,
  LocalityModel,
  PublicationHistoryModel,
  PublicationPhotosModel,
  PublicationStateModel,
  UserModel,
} from "./index.js";

// This model represents a vehicle publication
export const PublicationModel = db.define(
  "Publication",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    vehicleBrand: DataTypes.STRING,
    vehicleModel: DataTypes.STRING,
    vehicleYear: DataTypes.INTEGER,
    vehicleVersion: DataTypes.INTEGER,
    vehicleState: DataTypes.ENUM("Nuevo", "Usado"),
    vehicleGroup: DataTypes.ENUM(
      "Alta gama",
      "Ciudad",
      "Familia",
      "Todo terreno",
      "Utilitario"
    ),
    kms: DataTypes.STRING,
    price: DataTypes.FLOAT,
    fuel: DataTypes.ENUM(
      "Diesel",
      "Nafta",
      "Nafta/Gnc",
      "Turbo Diesel",
      "Otro"
    ),
    ownerDetails: DataTypes.TEXT,
    infoAutoDetails: DataTypes.JSON,
    words: DataTypes.TEXT,
    slug: DataTypes.STRING,
  },
  {
    paranoid: true,
  }
);
