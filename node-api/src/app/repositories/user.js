import { UserModel } from "../models/index.js";

export class UserRepository {
  constructor() {
    this.model = UserModel;
  }

  getUserById(id) {
    return this.model.findOne({ where: { id: id } });
  }

  getUserByEmail(email) {
    try {
      return this.model.findOne({ where: { email: email } });
    } catch (e) {
      console.error(e);
    }
  }

  createUser(first_name, last_name, email, pwdHash) {
    try {
      return this.model.create({
        first_name,
        last_name,
        email,
        password: pwdHash,
      });
    } catch (e) {
      console.error(e);
    }
  }

  async updateUser(id, values) {
    try {
      await this.model.update(values, { where: { id: id } });
      return this.getUserById(id);
    } catch (e) {
      console.error(e);
    }
  }

  deleteUser(id) {
    //return this.db.query('DELETE FROM users WHERE id = ?', [id]);
  }

  getUserByVerificationToken(token) {
    try {
      return this.model.findOne({ where: { verification_token: token } });
    } catch (e) {
      console.error(e);
    }
  }
}
