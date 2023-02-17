

module.exports = (sequelize, DataTypes) => {
  const CommentThread = sequelize.define('CommentThread', {
    chatToken: DataTypes.STRING,
  }, {});

  CommentThread.associate = (models) => {
    CommentThread.messages = CommentThread.hasMany(models.mah.Message, { foreignKey: 'commentThread_id', as: 'messages', onDelete: 'CASCADE' });
    CommentThread.participant1 = CommentThread.belongsTo(models.mah.User, { foreignKey: 'participant1_id' });
    CommentThread.participant2 = CommentThread.belongsTo(models.mah.User, { foreignKey: 'participant2_id' });
    CommentThread.publication = CommentThread.belongsTo(models.mah.Publication, { foreignKey: 'publication_id', onDelete: 'CASCADE' });
  };
  return CommentThread;
};
