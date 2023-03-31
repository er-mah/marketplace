import { DataTypes } from "sequelize";
import { db } from "../../config/db.js";
import {PublicationModel} from "./publication.js";

// This model is an intermediate table that represents each change a publication suffers
export const PublicationChangesModel = db.define(
  "Publication Change",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    hooks: {
      /**
       * This is a Sequelize hook that runs before creating a record in the database. If the value of the active
       * property is true, then all records in the PublicationChangesModel table that have the value of the active
       * property as false and the same publicationId as the current record are updated and the value of the active
       * property of the current record is set to true. Otherwise, nothing happens.
       * @param attributes
       * @param options
       * @returns {Promise<void>}
       */
      beforeCreate: async (attributes, options) => {
        if (attributes.active && attributes.publication_id) {

          // Check that the publication ID is valid before updating other records
          const publication = await PublicationModel.findByPk(attributes.publication_id);
          if (!publication) {
            throw new Error(`Invalid publication ID: ${attributes.publication_id}`);
          }

          // If active is true, update the other registers
          await PublicationChangesModel.update(
            { active: false },
            { where: { active: true, publication_id: attributes.publication_id } }
          );
        }
      },
    },
    timestamps: true,
  }
);
