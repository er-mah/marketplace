'use strict';
module.exports = (sequelize, DataTypes) => {
  var Town = sequelize.define('Town', {
    name: DataTypes.STRING,
    province_id: DataTypes.INTEGER
  }, {timestamps:false});
  Town.associate = function(models) {
    // associations can be defined here
  };
  return Town;
};