

module.exports = (sequelize, DataTypes) => {
  const Publication = sequelize.define('Publication', {
    brand: DataTypes.STRING,
    group: DataTypes.STRING,
    modelName: DataTypes.STRING,
    kms: DataTypes.STRING,
    price: DataTypes.FLOAT,
    year: DataTypes.INTEGER,
    fuel: DataTypes.STRING,
    observation: DataTypes.TEXT,
    imageGroup_id: DataTypes.INTEGER,
    carState_id: DataTypes.INTEGER,
    codia: DataTypes.INTEGER,
  }, {
    paranoid: true,
  });
  return Publication;
};
