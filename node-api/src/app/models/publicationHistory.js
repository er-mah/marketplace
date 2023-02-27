import { DataTypes } from "sequelize";
import { db } from "../../config/db.js";

import { PublicationModel, PublicationStateModel } from "./index.js";

// This model is an intermediate table that represents each change a publication suffers

export const PublicationHistoryModel = db.define("PublicationHistory", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  createdAt: DataTypes.DATE,
  active: DataTypes.BOOLEAN,
});

