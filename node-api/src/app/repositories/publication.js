import { PublicationModel } from "../models/index.js";
import { PublicationChangeRepository } from "./publicationChange.js";

export class PublicationRepository {
  constructor() {
    this.model = PublicationModel;
    this.publicationChangeRepository = new PublicationChangeRepository();
  }

  async getPublicationById(id) {
    try {
      return this.model.findByPk(id);
    } catch (e) {
      console.error(e);
    }
  }

  async getPublicationBySlug(slug) {
    try {
      return this.model.findOne({
        where: { slug },
      });
    } catch (e) {
      console.error(e);
    }
  }

  async createPublication(values) {
    try {
      return this.model.create(values);
    } catch (e) {
      console.error(e);
    }
  }

  async updatePublicationById(id, values) {
    try {
      return await this.model.update(values, { where: { id: id } });
    } catch (e) {
      console.error(e);
    }
    //return this.db.query('UPDATE users SET ? WHERE id = ?', [user, id]);
  }

  async deletePublication(id) {
    //return this.db.query('DELETE FROM users WHERE id = ?', [id]);
  }

  async setPublicationToPending(publicationId) {
    try {
      return await this.publicationChangeRepository.addNewPublicationChange(
        // Pendiente
        1,
        publicationId
      );
    } catch (e) {
      console.error(e);
    }
  }

  async setPublicationToPosted(publicationId) {
    return await this.publicationChangeRepository.addNewPublicationChange(
      // Publicada
      2,
      publicationId
    );
  }
}
