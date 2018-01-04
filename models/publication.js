

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
    carState: DataTypes.ENUM('Nuevo', 'Usado'),
    codia: DataTypes.INTEGER,
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
  }, {
    paranoid: true,
  });
  Publication.associate = (models) => {
    Publication.commentThread = Publication.hasMany(models.mah.CommentThread, { foreignKey: 'publication_id', onDelete: 'CASCADE' });
    Publication.ImageGroup = Publication.belongsTo(models.mah.ImageGroup, { foreignKey: 'imageGroup_id' });
    Publication.state = Publication.belongsToMany(models.mah.PublicationState, {
      through: models.mah.HistoryState,
      foreignKey: 'publication_id',
      onDelete: 'CASCADE',
    });
  };
  return Publication;
};
