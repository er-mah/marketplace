
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
    ownerName: DataTypes.STRING,
    ownerAddress: DataTypes.STRING,
    ownerDNI: DataTypes.STRING,
    ownerEmail: DataTypes.STRING,
    ownerPhone: DataTypes.STRING,
    isAdmin: DataTypes.BOOLEAN,
    isAgency: DataTypes.BOOLEAN,
    password_hash: DataTypes.STRING,
  });
  User.generateHash = password =>
    bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);

  User.prototype.validPassword = (password, userpass) =>
    bcrypt.compareSync(password, userpass);

  User.associate = (models) => {
    User.Publication = User.hasMany(models.mah.Publication, { foreignKey: 'user_id', onDelete: 'CASCADE' });
    User.Province = User.belongsTo(models.mah.Provinces, {foreignKey:'province_id', onDelete:'CASCADE'})
    User.Town = User.belongsTo(models.mah.Town, {foreignKey:'town_id', onDelete:'CASCADE'})
  };

  return User;
};
