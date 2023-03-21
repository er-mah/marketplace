import bcrypt from "bcrypt";
// These methods help generate hashed passwords and compare passwods
export const passwordsUtils = {
  saltRounds: 10,

  async getHashedPassword(password) {
    return await bcrypt.hash(password, this.saltRounds);
  },

  async arePasswordsMatching(password, hashedPassword) {
    return await bcrypt.compare(password, hashedPassword);
  },
};
