

module.exports = (sequelize, DataTypes) => {
  const HistoryState = sequelize.define('HistoryState', {
    createdAt: DataTypes.DATE,
    publication_id: DataTypes.INTEGER,
    publicationState_id: DataTypes.INTEGER,
  });
  return HistoryState;
};
