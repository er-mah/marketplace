
const bcrypt = require('bcrypt-nodejs');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    name: DataTypes.STRING,
    address: DataTypes.STRING,
    phone: DataTypes.STRING,
    agencyName: DataTypes.STRING,
    agencyAdress: DataTypes.STRING,
    agencyEmail: DataTypes.STRING,
    agencyPhone: DataTypes.STRING,
    profileImage: DataTypes.STRING,
    bannerImage: DataTypes.STRING,
    isAdmin: DataTypes.BOOLEAN,
    isAgency: DataTypes.BOOLEAN,
  });
  User.generateHash = password =>
    bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);

  User.prototype.validPassword = (password, userpass) =>
    bcrypt.compareSync(password, userpass);

  User.associate = (models) => {
    User.Publication = User.hasMany(models.mah.Publication, { foreignKey: 'user_id', onDelete: 'CASCADE' });
  };

  return User;
};
