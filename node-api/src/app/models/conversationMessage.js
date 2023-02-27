import { DataTypes } from "sequelize";
import { db } from "../../config/db.js";

import { UserModel } from "./index.js";

// This model represents a message sent by a user in a conversation.
export const ConversationMessageModel = db.define(
  "ConversationMessage",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    content: DataTypes.TEXT,
    read: DataTypes.DATE,
  },
  {
    paranoid: true,
  }
);
