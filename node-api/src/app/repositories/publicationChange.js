import { PublicationChangesModel } from "../models/index.js";

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

  async getStateNameWithPublicationChange(pubChange) {
    try {
      pubChange.state = await this.model.findByPk(pubChange.state_id);
      return pubChange;
    } catch (e) {
      console.error(e);
    }
  }

  async getAllChangesByPublicationId(publicationId) {
    try {
      return await this.model
        .findAll({
          where: { publication_id: publicationId },
        })
        .then((changes) => {
          let changesWithState = [];
          changes.map((change) => {
            changesWithState.push(
              this.getStateNameWithPublicationChange(change)
            );
          });
          return changesWithState;
        });
    } catch (e) {
      console.error(e);
    }
  }
}
