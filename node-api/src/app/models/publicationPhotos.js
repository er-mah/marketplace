import { db } from "../../config/db.js";
import { DataTypes } from "sequelize";

import { PublicationModel } from "./index.js";

// This model represents a group of images
export const PublicationPhotosModel = db.define(
  "PublicationPhotos",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    image1: DataTypes.STRING,
    image2: DataTypes.STRING,
    image3: DataTypes.STRING,
    image4: DataTypes.STRING,
    image5: DataTypes.STRING,
    image6: DataTypes.STRING,
    image7: DataTypes.STRING,
    image8: DataTypes.STRING,
    image9: DataTypes.STRING,
    image10: DataTypes.STRING,
    image11: DataTypes.STRING,
    image12: DataTypes.STRING,
    image13: DataTypes.STRING,
    image14: DataTypes.STRING,
    image15: DataTypes.STRING,
    image16: DataTypes.STRING,
    image17: DataTypes.STRING,
    image18: DataTypes.STRING,
    image19: DataTypes.STRING,
    image20: DataTypes.STRING,
  },
  {
    timestamps: false,
    paranoid: true,
  }
);
