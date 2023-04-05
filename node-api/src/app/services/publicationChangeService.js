import {
  PublicationChangesModel,
  PublicationModel,
  PublicationStateModel,
} from "../models/index.js";

export const PublicationChangeService = {
  addNewPublicationChange: async function (state_id, publication_id) {
    await PublicationChangesModel.create({
      state_id: state_id,
      publication_id: publication_id,
      active: true,
    });
  },

  getStateNameWithPublicationChange: async function (pubChange) {
    pubChange.state = await PublicationStateModel.findByPk(pubChange.state_id);
    return pubChange;
  },

  getAllChangesByPublicationId: async function (publicationId) {
    return PublicationChangesModel.findAll({
      where: { publication_id: publicationId },
    }).then((changes) => {
      let changesWithState = [];
      changes.map((change) => {
        changesWithState.push(this.getStateNameWithPublicationChange(change));
      });
      return changesWithState;
    });
  },
};
