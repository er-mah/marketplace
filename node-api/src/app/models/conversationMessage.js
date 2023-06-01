import { DataTypes } from "sequelize";
import { db } from "../../config/db.js";

// This model represents a message sent by a user in a conversation.
export const ConversationMessageModel = db.define(
  "Conversation Message",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    content: DataTypes.TEXT,
    read_at: DataTypes.DATE,
  },
  {
    timestamps: true,
    paranoid: true,
  }
);
