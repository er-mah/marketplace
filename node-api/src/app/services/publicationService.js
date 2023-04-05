import { PublicationModel } from "../models/index.js";
import { PublicationChangeService } from "./publicationChangeService.js";

export const PublicationService = {
  setPublicationToPending: async function (publicationId) {
    try {
      return PublicationChangeService.addNewPublicationChange(
        // Pendiente
        1,
        publicationId
      );
    } catch (e) {
      console.log(e);
    }
  },
  setPublicationToPosted: async function (publicationId) {
    return PublicationChangeService.addNewPublicationChange(
      // Publicada
      2,
      publicationId
    ).catch((e) => {
      if (e.name !== "SequelizeEmptyResultError") {
        // Set the last change to true
      }
      console.log(e);
    });
  },

  getPublicationBySlug: async function (slug) {
    try {
      return PublicationModel.findOne({
        where: { slug },
      });
    } catch (e) {
      return new Error(e.msg);
    }
  },

  addNewPublication: async function (values) {
    try {
      return PublicationModel.create(values);
    } catch (e) {
      return new Error(e.msg);
    }
  },

  updatePublication: function (publication, values) {
    try {
      console.log(values);
      return publication.update(values, { where: { id: publication.id } });
    } catch (e) {
      return new Error(e.msg);
    }
  },

  getPublicationById(id) {
    try {
      return PublicationModel.findByPk(id);
    } catch (e) {
      return new Error(e.msg);
    }
  },
};
