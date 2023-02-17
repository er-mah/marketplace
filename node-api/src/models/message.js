

module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define('Message', {
    content: DataTypes.TEXT,
    read: DataTypes.DATE,
  }, {});

  Message.associate = (models) => {
    Message.User = Message.belongsTo(models.mah.User, { foreignKey: 'from_id' });
  };

  return Message;
};
