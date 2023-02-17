'use strict';
module.exports = (sequelize, DataTypes) => {
  const lead123 = sequelize.define('lead123', {
    name: DataTypes.STRING,
    secondName: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
    prima: DataTypes.STRING,
    premio: DataTypes.STRING,
    company: DataTypes.STRING
  }, {});
  lead123.associate = function(models) {
    // associations can be defined here
  };
  return lead123;
};