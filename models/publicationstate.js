

module.exports = (sequelize, DataTypes) => {
  const PublicationState = sequelize.define('PublicationState', {
    stateName: DataTypes.STRING,
  }, {
    timestamps: false,
  });
  PublicationState.associate = (models) => {
    PublicationState.publication = PublicationState.belongsToMany(models.mah.Publication, {
      through: models.mah.HistoryState, // this can be string or a model,
      foreignKey: 'publicationState_id',
      onDelete: 'CASCADE',
      otherKey: 'createdAt',
    });
  };
  return PublicationState;
};
