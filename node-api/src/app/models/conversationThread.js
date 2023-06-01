import { db } from "../../config/db.js";
import { DataTypes } from "sequelize";

// This model represents a conversation between users.
export const ConversationThreadModel = db.define(
  "Conversation Thread",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    chat_token: DataTypes.STRING,
  },
  {
    timestamps: true,
    paranoid: true,
  }
);
