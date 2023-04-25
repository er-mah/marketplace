import {UserModel} from "../models/index.js";

export class UserRepository {
  constructor() {
    this.model = UserModel;
  }

  async getUserById(id) {
    //return this.model.query('SELECT * FROM users WHERE id = ?', [id]);
  }

  async getUserByEmail(email) {
    try {
      return await UserModel.findOne({where: {email: email}});
    } catch (e) {
      console.error(e);
    }
  }

  async createUser(first_name, last_name, email, pwdHash) {
    try {
      return await UserModel.create({
        first_name,
        last_name,
        email,
        password: pwdHash,
      });
    } catch (e) {
      console.error(e);
    }
  }

  async updateUserById(id, data) {
      try {
          return await UserModel.update(...data, { where: { email: id } });
      } catch (e) {
          console.error(e);
      }
    //return this.db.query('UPDATE users SET ? WHERE id = ?', [user, id]);
  }

  async deleteUser(id) {
    //return this.db.query('DELETE FROM users WHERE id = ?', [id]);
  }

  async getUserByVerificationToken(token) {
    try {
      return await UserModel.findOne({ where: { verification_token: token } });
    } catch (e) {
      console.error(e);
    }
  }
}
