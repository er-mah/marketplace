import {PublicationChangesModel, PublicationStateModel} from "../models/index.js";

export class PublicationChangeRepository {
  constructor() {
    this.model = PublicationChangesModel;
  }

  async addNewPublicationChange(state_id, publication_id) {
    try {
      return await this.model.create({
        state_id: state_id,
        publication_id: publication_id,
        active: true,
      });
    } catch (e) {
      console.error(e);
    }
  }

  async getStateNameByPubChangeId(pubChangeId) {
    try {
      const state = await PublicationStateModel.findByPk(pubChangeId);
      return state.name;
    } catch (e) {
      console.error(e);
    }
  }

  async getAllChangesByPublicationId(publicationId) {
    try {
      let publicationChanges = [];

      const changes = await this.model
        .findAll({
          where: { publication_id: publicationId },
        })

      const changesJSON = changes.map(change => change.toJSON());

      for (const change of changesJSON) {
        change.name = await this.getStateNameByPubChangeId(change.state_id);
        publicationChanges.push(change);
      }

      console.log(publicationChanges);
      return publicationChanges;

    } catch (e) {
      console.error(e);
    }
  }
}
