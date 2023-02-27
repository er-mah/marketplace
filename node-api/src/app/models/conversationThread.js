import { db } from "../../config/db.js";

import {
  ConversationMessageModel,
  PublicationModel,
  UserModel,
} from "./index.js";
import { DataTypes } from "sequelize";

// This model represents a conversation between users.
export const ConversationThreadModel = db.define(
  "ConversationThread",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    chatToken: DataTypes.STRING,
  },
  {
    paranoid: true,
  }
);
