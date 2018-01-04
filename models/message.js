

module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define('Message', {
    from_id: DataTypes.INTEGER,
    content: DataTypes.TEXT,
  }, {});
  return Message;
};
