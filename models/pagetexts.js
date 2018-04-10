

module.exports = (sequelize, DataTypes) => {
  const PageTexts = sequelize.define('PageTexts', {
    route: DataTypes.STRING,
    section: DataTypes.STRING,
    text: DataTypes.TEXT,
  }, {});
  PageTexts.associate = function (models) {
    // associations can be defined here
  };
  return PageTexts;
};
