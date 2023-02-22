

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
    words: DataTypes.TEXT,
    phone: DataTypes.STRING,
    ml_detail: DataTypes.STRING,
    ml_id: DataTypes.STRING,
  }, {
    paranoid: true,
  });
  Publication.associate = (models) => {
    Publication.commentThread = Publication.hasMany(models.mah.CommentThread, { foreignKey: 'publication_id', onDelete: 'CASCADE' });
    Publication.ImageGroup = Publication.belongsTo(models.mah.ImageGroup, { foreignKey: 'imageGroup_id' });
    Publication.PublicationDetail = Publication.belongsTo(models.mah.PublicationDetail, { foreignKey: 'publicationDetail_id', as: 'publicationDetail', onDelete: 'CASCADE' });
    Publication.User = Publication.belongsTo(models.mah.User, { foreignKey: 'user_id' });
    Publication.state = Publication.belongsToMany(models.mah.PublicationState, {
      through: models.mah.HistoryState,
      foreignKey: 'publication_id',
      onDelete: 'CASCADE',
    });
    Publication.Province = Publication.belongsTo(models.mah.Provinces, {foreignKey:'province_id', onDelete:'CASCADE'})
    Publication.Town = Publication.belongsTo(models.mah.Town, {foreignKey:'town_id', onDelete:'CASCADE'})
  };
  return Publication;
};
