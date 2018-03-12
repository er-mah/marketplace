

module.exports = (sequelize, DataTypes) => {
  const HistoryState = sequelize.define('HistoryState', {
    createdAt: DataTypes.DATE,
    publication_id: DataTypes.INTEGER,
    publicationState_id: DataTypes.INTEGER,
    active: DataTypes.BOOLEAN,
  });
  HistoryState.associate = (models) => {
    HistoryState.publication = HistoryState.belongsTo(models.mah.Publication, { foreignKey: 'publication_id', onDelete: 'CASCADE' });
    HistoryState.publicationState = HistoryState.belongsTo(models.mah.PublicationState, { foreignKey: 'publicationState_id' });
  };
  return HistoryState;
};
