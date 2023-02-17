

module.exports = (sequelize, DataTypes) => {
  const user_meli = sequelize.define('user_meli', {
    user_id: DataTypes.INTEGER,
    ml_user_id: DataTypes.INTEGER,
    user_token: DataTypes.STRING,
    user_refresh_token: DataTypes.STRING,
    user_code: DataTypes.STRING,
    expires_in: DataTypes.DATE,
  }, {});
  user_meli.associate = function (models) {
    user_meli.User = user_meli.belongsTo(models.mah.User, { foreignKey: 'user_id' });
  };
  return user_meli;
};
